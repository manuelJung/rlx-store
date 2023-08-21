import dispatchEvent from './rule/dispatchEvent'
import { startAddWhenSaga } from './rule/saga'
import { createRuleContainer } from './rule/utils'
import * as t from './types'

export default function createRuleManager (args:t.FactoryArgs, managers:t.Managers) {
  const db = new Map<string,t.RuleContainer>()
  const activeRules:t.ActiveRules = {
    BEFORE: {},
    INSTEAD: {},
    AFTER: {},
  }

  return {
    db,
    activeRules,
    register: (rule:t.Rule, storeContainer?:t.StoreContainer) => {
      const id = rule.id + (storeContainer?.id ?? '')
      if(db.has(id)) return
      const container = createRuleContainer(rule, db, activeRules, storeContainer)
      db.set(id, container)
      managers.events.trigger({type:'REGISTER_RULE', container})
      startAddWhenSaga(container)
    },
    dispatch: (action:t.Action, cb:()=>void, storeContainer:t.StoreContainer) => 
      dispatchEvent(action, activeRules, cb, storeContainer)
  }
}