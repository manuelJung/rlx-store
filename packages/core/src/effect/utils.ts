import * as t from '../types'
import { createEventContainer } from '../utils'

export function createEffectContainer (effect:t.Effect):t.EffectContainer {
  return {
    id: effect.id,
    effect: effect,
    active: false,
    dropped: false,
    events: createEventContainer(),
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