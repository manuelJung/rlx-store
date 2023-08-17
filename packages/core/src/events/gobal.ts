import * as t from '../types'

export type GlobalRegisterStoreEvent = {
  type: 'REGISTER_STORE'
  container: t.StoreContainer
}

export type GlobalRegisterRuleEvent = {
  type: 'REGISTER_RULE'
  container: t.RuleContainer
}

export type GlobalEvent =
| GlobalRegisterStoreEvent
| GlobalRegisterRuleEvent