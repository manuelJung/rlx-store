import { Action, AsyncActionConfig, FunctionAction, Managers, Store, StoreConfig, StoreContainer } from "./types"

export function removeItem <Item>(list:Item[], item:Item) {
  let i, j

  for (i = 0, j = 0; i < list.length; ++i) {
    if (item !== list[i]) {
      list[j] = list[i]
      j++
    }
  }

  if(j < i) list.pop()
}

type AT<T> = T extends { type: infer D } ? D : never
type A<LIST,TYPE> = LIST extends { type: TYPE } ? LIST : never

export function createEventContainer<T extends {type:string}>() {
  const onceList:Record<string,any> = {}
  const onList:Record<string,any> = {}
  
  return {
    once<TYPE extends AT<T>>(type:TYPE, cb:(event:A<T,TYPE>)=>void){
      if(!onceList[type]) onceList[type] = []
      onceList[type].push(cb)
      return () => removeItem(onceList[type], cb)
    },
    on<TYPE extends AT<T>>(type:TYPE, cb:(event:A<T,TYPE>)=>void){
      if(!onList[type]) onList[type] = []
      onList[type].push(cb)
      return () => removeItem(onList[type], cb)
    },
    trigger(event:T){
      let i = 0
      const once = onceList[event.type]
      const on = onList[event.type]

      if(once){
        onceList[event.type] = []
        for(i=0;i<once.length;i++){
          const cb = once[i]
          cb(event)
        }
      }
      if(on){
        for(i=0;i<on.length;i++){
          const cb = on[i]
          cb(event)
        }
      }
    },
    offOnce(type:AT<T>, cb:(event:T)=>void) {
      removeItem(onceList[type], cb)
    },
    clearOnce(type:AT<T>){
      onceList[type] = []
    }
  }
}

export const createAction = (key:string, config:{
  managers: Managers
  container: StoreContainer
  containerDb: Map<string, StoreContainer>
  storeConfig: StoreConfig
  dispatchWrapper?: (fn: any) => void
  updateFn: (...args:any[]) => FunctionAction | AsyncActionConfig
  onExecute?: (config:AsyncActionConfig, ...args:any[]) => FunctionAction
  isRequestStage?: boolean
}) => {
  const updateState = (nextState:any) => {
    if(typeof nextState !== 'object') config.container.state = nextState
    else if(nextState === null) config.container.state = nextState
    else if(Array.isArray(nextState)) config.container.state = nextState
    else config.container.state = {...config.container.state, ...nextState}
    for (const fn of config.container.subscriptions) fn(config.container.state)
  }
  /** 
   * we need a function to capture the "this" object which can point to a modified store-version
   * which can implement the "dispatchWrapper" effect function from consequence
   * so the action can be canceled by consequence
   */
  return function (...args:any[]) {
    // @ts-expect-error
    const actions = this as Store['actions']
    let promise:Promise<boolean>|null = null
    /** consequence can attach action execution */
    const effect = config.dispatchWrapper ?? actions.dispatchWrapper ?? ((fn) => fn())
    const state = config.container.state

    if(config.onExecute) {
      const onExecute = config.onExecute
      effect(() => {
        const actionConfig = config.updateFn(...args) as AsyncActionConfig
        const action:Action = {
          type: config.container.store.name + "/" + key,
          meta: args,
          payload: args[0],
        }
        if(config.isRequestStage) {
          promise = new Promise<boolean>(resolve => {
            action._promiseResolve = resolve
          })
          action.payload = actionConfig.optimisticData ? actionConfig.optimisticData(state) : undefined
          const datakey = actionConfig.mappings?.data ?? 'data'
          action._resetData = state[datakey]
        }
        config.managers.rule.dispatch({
          action,
          storeContainer: config.container,
          storeDb: config.containerDb,
          cb: () => updateState(onExecute(actionConfig, ...args)(state))
        })
      })
      return promise
    }

    effect(() => {
      const action:Action = {
        type: config.container.store.name + "/" + key,
        meta: args,
        payload: args[0],
      }
      const fn = config.updateFn(...args) as FunctionAction
      config.managers.rule.dispatch({
        action,
        storeContainer: config.container,
        storeDb: config.containerDb,
        cb: () => updateState(fn(state)),
      })
    })
  }
}