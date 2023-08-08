import * as t from '../types'
import { getCurrentConsequenceExecId } from './consequence'

const cycle = {
  waiting: false,
  step: 0
}

let execId = 1

export default function dispatchEvent (action:t.Action, activeEffects:t.ActiveEffects, cb:(action:t.Action)=>void) {
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

  forEachRuleContext(activeEffects, action.type, 'INSTEAD', container => {
    if(actionExecution.canceled) return
  })
}

const forEachRuleContext = (
  activateEffects:t.ActiveEffects, 
  target:string, 
  position:t.EffectPosition, 
  cb:(container:t.EffectContainer)=>void
) => {
  const targetList = activateEffects[position][target]
  let i = 0

  if(targetList) {
    for (i=0; i<targetList.length; i++) cb(targetList[i])
  }
}