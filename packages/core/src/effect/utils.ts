import * as t from '../types'
import { createEventContainer, removeItem } from '../utils'

export function createEffectContainer (
  effect:t.Effect, 
  effectDb: Map<string, t.EffectContainer>,
  activeEffects: t.ActiveEffects,
  storeContainer?:t.StoreContainer,
):t.EffectContainer {
  return {
    id: effect.id,
    effect: effect,
    active: false,
    events: createEventContainer(),
    storeContainer: storeContainer ?? null,
    effectDb,
    activeEffects,
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
 * totaly removes effect from everywhere, like it never existed. all sagas will be canceled
 */
export function destroyEffect (container:t.EffectContainer) {
  deactivateEffect(container)
  container.effectDb.delete(container.id)
  container.events.trigger({type: 'DESTROY'})
}

/**
 * effect can no longer react to actions, but will exist in db and addWhen saga can be active
 */
export function deactivateEffect (container:t.EffectContainer) {
  const position = container.effect.position ?? 'AFTER'
  const targets = getTargets(container)
  container.active = false

  for(const at of targets) {
    removeItem(container.activeEffects[position][at], container)
  }
  container.events.trigger({type: 'DEACTIVATE'})
}

/**
 * effect can now react to actions and addUntil saga can be active
 */
export function activateEffect (container:t.EffectContainer) {
  const position = container.effect.position ?? 'AFTER'
  const targets = getTargets(container)
  container.active = true
  
  for(const at of targets) {
    if(!container.activeEffects[position][at]) container.activeEffects[position][at] = []
    pushByWeight(container.activeEffects[position][at], container)
  }
  container.events.trigger({type: 'ACTIVATE'})
}

/**
 * returns a list of action types the effect will react to
 */
export function getTargets(container:t.EffectContainer) {
  return typeof container.effect.target === 'string'
    ? [container.effect.target]
    : container.effect.target
}

/**
 * adds an effect-container to a list of effect-containers, respecting the weight
 */
function pushByWeight (list:t.EffectContainer[], container:t.EffectContainer) {
  if(!container.effect.weight || !list.length){
    return list.unshift(container)
  }
  let i:number, prev:t.EffectContainer|null = null, temp:t.EffectContainer

  for (i = 0; i < list.length; i++) {
    if (prev) {
      temp = list[i]
      list[i] = prev
      prev = temp
    }
    else if (!list[i].effect.weight) {
      continue
    }
    else if (container.effect.weight <= (list[i].effect.weight ?? 0)) {
      prev = list[i]
      list[i] = container
    }
  }

  if(prev) list.push(prev)
  else list.push(container)
}