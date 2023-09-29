import * as t from '../types'
import { destroyRule } from './utils'

let execId = 1
let wrappedExecIds:number[] = []
export const getCurrentConsequenceExecId = () => wrappedExecIds[wrappedExecIds.length-1] || null

export default function consequence (
  actionExecution: t.ActionExecution,
  container: t.RuleContainer,
  storeDb: Map<string,t.StoreContainer>,
) {
  const action = actionExecution.action
  const rule = container.rule

  // setup concurrency
  const concurrencyId = rule.concurrencyFilter ? rule.concurrencyFilter(action) : 'default'
  if(!container.concurrency[concurrencyId]){
    container.concurrency[concurrencyId] = {
      running: 0,
      debounceTimeoutId: null,
    }
  }
  const concurrency = container.concurrency[concurrencyId]

  // rules that terminate after execution should not be removed when they return a promise
  // so we totally ignore all futher consequence executions until the rule is removed
  if(concurrency.running){
    // TODO: what happens when position === INSTEAD. will actionExecution be canceled?
    if(rule.onExecute === 'REMOVE_RULE' || rule.onExecute === 'RECREATE_RULE') return {resolved:false}
  }

  // setup ruleExecution
  const ruleExecution:t.RuleExecution = {
    execId: execId++,
    concurrencyId: concurrencyId,
    actionExecId: actionExecution.execId,
    canceled: false,
  }

  container.events.trigger({
    type: 'CONSEQUENCE_START',
    ruleExecution,
    actionExecution,
  })
  concurrency.running++

  // const context:t.CTX = {
  //   set: () => {throw new Error('you cannot call setContext within a consequence or condition. check rule '+ rule.id)},
  //   get: (name:string) => container.publicContext.addUntil[name] 
  //   || container.publicContext.addWhen[name]
  //   || container.publicContext.global[name]
  // }

  const effect = fn => {
    if(ruleExecution.canceled) return
    rule.concurrency === 'SWITCH' && container.events.trigger({
      type: 'CANCEL_CONSEQUENCE',
      ruleExecution,
      logic: 'SWITCH'
    })
    wrappedExecIds.push(ruleExecution.execId)
    const result = fn()
    wrappedExecIds.pop()
    return result
  }

  const getStore = (name:string, key?:string) => {
    // TODO: O(1) performance needed
    for(const container of storeDb.values()) {
      if(container.id === name && container.store.key === key) return {
        ...container.store,
        dispatchWrapper: effect,
      } satisfies t.Store
    }
    return null
  }
  const getStores = (name:string) => {
    const stores:t.Store[] = []
    for(const container of storeDb.values()) {
      if(container.id === name) stores.push(container.store)
    }
    return stores.map(store => ({...store, dispatchWrapper: effect}) satisfies t.Store)
  }

  /**
   * Check concurrency and conditions
   */

  // trigger when consequence should not be invoked (e.g condition does not match)
  const endConsequence = (logic:'SKIP'|'CONDITION_NOT_MATCHED') => {
    concurrency.running--
    container.events.trigger({
      type: 'CONSEQUENCE_END',
      actionExecution,
      ruleExecution,
      logic,
    })
    return {resolved:false}
  }

  if(concurrency.running-1 > 0){
    // skip when concurrency matches
    if(rule.concurrency === 'ONCE') return endConsequence('SKIP')
    if(rule.concurrency === 'FIRST') return endConsequence('SKIP')
    // cancel previous consequences
    if(rule.concurrency === 'LAST') container.events.trigger({
      type: 'CANCEL_CONSEQUENCE',
      ruleExecution,
      logic: 'LAST'
    })
    if(rule.throttle) container.events.trigger({
      type: 'CANCEL_CONSEQUENCE',
      ruleExecution,
      logic: 'THROTTLE'
    })
    if(rule.debounce) container.events.trigger({
      type: 'CANCEL_CONSEQUENCE',
      ruleExecution,
      logic: 'DEBOUNCE'
    })
  }

  // skip if 'skipRule' condition matched
  if(action.meta && action.skipRule && matchGlob(rule.id, action.skipRule)){
    return endConsequence('SKIP')
  }
  // skip if rule condition does not match
  if(rule.condition){
    const args:t.ConditionArgs = { 
      action,
      store: actionExecution.storeContainer.store,
      getStore,
      getStores,
    }
    if(!rule.condition(args)){
      return endConsequence('CONDITION_NOT_MATCHED')
    }
  }

  /**
   * setup cancelation
   */

  // later consequences can cancel this execution
  const offCancel = container.events.on('CANCEL_CONSEQUENCE', evt => {
    if(evt.ruleExecution.concurrencyId !== ruleExecution.concurrencyId) return
    if(evt.ruleExecution.execId === ruleExecution.execId) return
    // only cancel prev executions for switch
    if(evt.logic === 'SWITCH' && evt.ruleExecution.execId < ruleExecution.execId){
      return
    }
    cancel()
    status = 'CANCELED'
  })

  // cancel consequence when rule gets deactivated
  const offRemoveRule = container.events.once('DEACTIVATE', () => {
    cancel()
    status = 'REMOVED'
  })

  /**
   * Execute consequence
   */
  let result:any
  let status:'CANCELED'|'REMOVED'|null = null
  const cancel = () => {ruleExecution.canceled = true}
  const wasCanceled = () => ruleExecution.canceled
  const consequenceArgs:t.ConsequenceArgs = { 
    action, 
    wasCanceled, 
    effect,
    store: {
      ...actionExecution.storeContainer.store,
      dispatchWrapper: effect,
    } satisfies t.Store,
    getStore,
    getStores,
  }

  // run the thing
  if(rule.throttle || rule.delay || rule.debounce){
    result = new Promise(resolve => {
      if(rule.debounce && concurrency.debounceTimeoutId) clearTimeout(concurrency.debounceTimeoutId)
      concurrency.debounceTimeoutId = setTimeout(() => {
        concurrency.debounceTimeoutId = null
        if(ruleExecution.canceled) return resolve(null)
        resolve(rule.consequence(consequenceArgs))
      }, rule.throttle || rule.delay || rule.debounce)
    })
  }
  else {
    result = rule.consequence(consequenceArgs)
  }

  if(rule.onExecute === 'REMOVE_RULE') {
    destroyRule(container)
  }


  /**
   * setup unlisten
   */
  function unlisten () {
    rule.concurrency !== 'ONCE' && concurrency.running--
    offRemoveRule()
    offCancel()
    container.events.trigger({
      type: 'CONSEQUENCE_END',
      actionExecution,
      ruleExecution,
      logic: status ?? 'RESOLVED',
    })
  }

  /**
   * Handle return types
   */

  // position:INSTEAD can extend the action if type is equal
  if(typeof result === 'object' && result !== null && result.type && rule.position === 'INSTEAD' && result.type === action.type){
    unlisten()
    return {resolved:true, action:result}
  }

  // dispatch returned action
  else if(typeof result === 'object' && result !== null && result.type){
    unlisten()
  }

  // dispatch returned (promise-wrapped) action
  else if(typeof result === 'object' && result !== null && result.then){
    // $FlowFixMe
    result.then(action => {
      unlisten()
    })
  }

  // register unlisten callback
  else if(typeof result === 'function'){
    const offRemoveRule = container.events.once('DEACTIVATE', () => {
      result()
      offCancel()
      unlisten()
    })
    const offCancel = container.events.once('CANCEL_CONSEQUENCE', evt => {
      if(evt.ruleExecution.concurrencyId !== ruleExecution.concurrencyId) return
      if(evt.ruleExecution.execId === ruleExecution.execId) return
      offRemoveRule()
      result()
      unlisten()
    })
  }

  // unlisten for void return
  else {
    unlisten()
  }

  return {resolved:true}
}

function matchGlob(id:string, glob:string | string[]):boolean{
  if(glob === '*') return true
  if(typeof glob === 'string') glob = [glob]
  for(let i=0;i<glob.length;i++){
    if(id.includes(glob[i])) return true
  }
  return false
}