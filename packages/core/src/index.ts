import createEffectManager from './createEffectManager'
import createStoreManager from './createStoreManager'
import * as t from './types'
import { createEventContainer } from './utils'

export default function createStoreFactory (args:t.FactoryArgs) {
  const managers = {
    store: null as any,
    effect: null as any,
    events: createEventContainer()
  } as t.Managers

  managers.store = createStoreManager(args, managers)
  managers.effect = createEffectManager(args, managers)

  return function createStore (storeConfig:t.StoreConfig) {
    const store = managers.store.create(storeConfig)
    return store
  }
}