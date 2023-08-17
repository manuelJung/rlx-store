import * as t from '../types'

export type RuleActiveEvent = {
  type: 'ACTIVATE'
}

export type RuleDeactiveEvent = {
  type: 'DEACTIVATE'
}

export type RuleDestroyEvent = {
  type: 'DESTROY'
}

export type RuleConsequenceStartEvent = {
  type: 'CONSEQUENCE_START',
  ruleExecution: t.RuleExecution
  actionExecution: t.ActionExecution
}

export type RuleConsequenceEndEvent = {
  type: 'CONSEQUENCE_END',
  ruleExecution: t.RuleExecution
  actionExecution: t.ActionExecution
  logic: 'SKIP'|'CONDITION_NOT_MATCHED'
}

export type RuleConsequenceCancelEvent = {
  type: 'CANCEL_CONSEQUENCE',
  ruleExecution: t.RuleExecution,
  logic: 'LAST' | 'THROTTLE' | 'DEBOUNCE' | 'SWITCH',
}

export type RuleEvent =
| RuleActiveEvent
| RuleDeactiveEvent
| RuleDestroyEvent
| RuleConsequenceStartEvent
| RuleConsequenceEndEvent
| RuleConsequenceCancelEvent