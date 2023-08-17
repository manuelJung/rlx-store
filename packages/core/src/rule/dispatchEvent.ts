import * as t from '../types'
import consequence, { getCurrentConsequenceExecId } from './consequence'

const cycle = {
  waiting: false,
  step: 0
}

let execId = 1

export default function dispatchEvent (action:t.Action, activeRules:t.ActiveRules, cb:(action:t.Action)=>void) {
  // detect endless recursive loops
  if(process.env.NODE_ENV !== 'production'){
    let next = fn => setTimeout(fn,1)
    if(!cycle.waiting){
      cycle.waiting = true
      next(() => {
        cycle.waiting = false
        cycle.step = 0
      })
    }
    if(cycle.step > 500) console.warn('detected endless cycle with action', action)
    if(cycle.step > 510) throw new Error('detected endless cycle')
  }

  const actionExecution:t.ActionExecution = {
    execId: execId++,
    ruleExecId: getCurrentConsequenceExecId(),
    canceled: false,
    history: [],
    action: action
  }

  forEachRuleContext(activeRules, action.type, 'INSTEAD', container => {
    if(actionExecution.canceled) return
    consequence(actionExecution, container)
  })

  if(actionExecution.canceled) return null

  forEachRuleContext(activeRules, action.type, 'BEFORE', container => {
    consequence(actionExecution, container)
  })

  cb(action)

  forEachRuleContext(activeRules, action.type, 'AFTER', container => {
    consequence(actionExecution, container)
  })

  return actionExecution.action
}

const forEachRuleContext = (
  activateRules:t.ActiveRules, 
  target:string, 
  position:t.RulePosition, 
  cb:(container:t.RuleContainer)=>void
) => {
  const targetList = activateRules[position][target]

  if(targetList) {
    for (let i=0; i<targetList.length; i++) cb(targetList[i])
  }
}