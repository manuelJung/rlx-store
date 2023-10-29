import dispatchEvent from './rule/dispatchEvent'
import { startAddWhenSaga } from './rule/saga'
import { createRuleContainer, updateRuleTarget } from './rule/utils'
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
      if(storeContainer) updateRuleTarget(rule, storeContainer.store.name)
      const container = createRuleContainer(rule, db, activeRules, storeContainer)
      db.set(id, container)
      managers.events.trigger({type:'REGISTER_RULE', container})
      startAddWhenSaga(container)
    },
    dispatch: (args: {
      action:t.Action, 
      storeContainer:t.StoreContainer,
      storeDb: Map<string,t.StoreContainer>,
      cb:()=>void, 
    }
    ) => {
      return dispatchEvent(args.action, activeRules, args.cb, args.storeContainer, args.storeDb)
    }
  }
}