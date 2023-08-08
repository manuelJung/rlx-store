import * as t from '../types'

export type GlobalRegisterStoreEvent = {
  type: 'REGISTER_STORE'
  container: t.StoreContainer
}

export type GlobalRegisterEffectEvent = {
  type: 'REGISTER_EFFECT'
  container: t.EffectContainer
}

export type GlobalEvent =
| GlobalRegisterStoreEvent
| GlobalRegisterEffectEvent