
export type EffectActiveEvent = {
  type: 'ACTIVATE'
}

export type EffectDeactiveEvent = {
  type: 'DEACTIVATE'
}

export type EffectDestroyEvent = {
  type: 'DESTROY'
}

export type EffectEvent =
| EffectActiveEvent
| EffectDeactiveEvent
| EffectDestroyEvent