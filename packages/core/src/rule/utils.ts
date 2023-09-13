import * as t from '../types'
import { createEventContainer, removeItem } from '../utils'

export function createRuleContainer (
  rule:t.Rule, 
  ruleDb: Map<string, t.RuleContainer>,
  activeRules: t.ActiveRules,
  storeContainer?:t.StoreContainer,
):t.RuleContainer {
  return {
    id: rule.id,
    rule: rule,
    active: false,
    events: createEventContainer(),
    storeContainer: storeContainer ?? null,
    ruleDb,
    activeRules,
    concurrency: {},
    publicContext: {
      addUntil: {},
      addWhen: {},
      global: {},
    }
    // runningSaga: null,
    // parentContext: null,
    // subRuleContextCounter: 0,
    // subRuleContexts: [],
    // concurrency: {},
    // publicContext: {
    //   global: {},
    //   addWhen: {},
    //   addUntil: {}
    // }
  }
}

/**
 * totaly removes rule from everywhere, like it never existed. all sagas will be canceled
 */
export function destroyRule (container:t.RuleContainer) {
  deactivateRule(container)
  container.ruleDb.delete(container.id)
  container.events.trigger({type: 'DESTROY'})
}

/**
 * rule can no longer react to actions, but will exist in db and addWhen saga can be active
 */
export function deactivateRule (container:t.RuleContainer) {
  const position = container.rule.position ?? 'AFTER'
  const targets = getTargets(container)
  container.active = false

  for(const at of targets) {
    removeItem(container.activeRules[position][at], container)
  }
  container.events.trigger({type: 'DEACTIVATE'})
}

/**
 * rule can now react to actions and addUntil saga can be active
 */
export function activateRule (container:t.RuleContainer) {
  const position = container.rule.position ?? 'AFTER'
  const targets = getTargets(container)
  container.active = true
  
  for(const at of targets) {
    if(!container.activeRules[position][at]) container.activeRules[position][at] = []
    pushByWeight(container.activeRules[position][at], container)
  }
  container.events.trigger({type: 'ACTIVATE'})
}

/**
 * returns a list of action types the rule will react to
 */
export function getTargets(container:t.RuleContainer) {
  return typeof container.rule.target === 'string'
    ? [container.rule.target]
    : container.rule.target
}

/**
 * adds an rule-container to a list of rule-containers, respecting the weight
 */
function pushByWeight (list:t.RuleContainer[], container:t.RuleContainer) {
  if(!container.rule.weight || !list.length){
    return list.unshift(container)
  }
  let i:number, prev:t.RuleContainer|null = null, temp:t.RuleContainer

  for (i = 0; i < list.length; i++) {
    if (prev) {
      temp = list[i]
      list[i] = prev
      prev = temp
    }
    else if (!list[i].rule.weight) {
      continue
    }
    else if (container.rule.weight <= (list[i].rule.weight ?? 0)) {
      prev = list[i]
      list[i] = container
    }
  }

  if(prev) list.push(prev)
  else list.push(container)
}

/**
 * extends rule target by storeName when target starts with "/"
 */
export function updateRuleTarget (rule:t.Rule, storeName:string):t.Rule {
  if(typeof rule.target === 'string') {
    if(rule.target[0] === '/') rule.target = storeName + rule.target
  }
  else {
    for(let i=0;i<rule.target.length;i++) {
      if(rule.target[i][0] === '/') rule.target[i] = storeName + rule.target[i]
    }
  }

  return rule
}