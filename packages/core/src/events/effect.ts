
export type EffectTestEvent1 = {
  type: 'EFFECT_TEST_EVENT_1'
  payload: number
}

export type EffectTestEvent2 = {
  type: 'EFFECT_TEST_EVENT_2'
}

export type EffectEvent =
| EffectTestEvent1
| EffectTestEvent2