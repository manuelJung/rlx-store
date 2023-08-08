import * as t from '../types'
import { createEventContainer } from '../utils'

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

export function destroyEffect (container:t.EffectContainer) {

}

export function activateEffect (container:t.EffectContainer) {

}