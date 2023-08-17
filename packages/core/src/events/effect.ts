import * as t from '../types'

export type EffectActiveEvent = {
  type: 'ACTIVATE'
}

export type EffectDeactiveEvent = {
  type: 'DEACTIVATE'
}

export type EffectDestroyEvent = {
  type: 'DESTROY'
}

export type EffectConsequenceStartEvent = {
  type: 'CONSEQUENCE_START',
  effectExecution: t.EffectExecution
  actionExecution: t.ActionExecution
}

export type EffectConsequenceEndEvent = {
  type: 'CONSEQUENCE_END',
  effectExecution: t.EffectExecution
  actionExecution: t.ActionExecution
  logic: 'SKIP'|'CONDITION_NOT_MATCHED'
}

export type EffectConsequenceCancelEvent = {
  type: 'CANCEL_CONSEQUENCE',
  effectExecution: t.EffectExecution,
  logic: 'LAST' | 'THROTTLE' | 'DEBOUNCE' | 'SWITCH',
}

export type EffectEvent =
| EffectActiveEvent
| EffectDeactiveEvent
| EffectDestroyEvent
| EffectConsequenceStartEvent
| EffectConsequenceEndEvent
| EffectConsequenceCancelEvent