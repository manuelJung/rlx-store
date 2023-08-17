import createEffectManager from './createRuleManager'
import createStoreManager from './createStoreManager'
import * as t from './types'
import { createEventContainer } from './utils'

export default function createStoreFactory (args:t.FactoryArgs) {
  const managers = {
    store: null as any,
    rule: null as any,
    events: createEventContainer()
  } as t.Managers

  managers.store = createStoreManager(args, managers)
  managers.rule = createEffectManager(args, managers)

  function createStore (storeConfig:t.StoreConfig) {
    const store = managers.store.create(storeConfig)
    return store
  }

  if(process.env.NODE_ENV === 'test') {
    // @ts-ignore
    createStore.managers = managers
  }

  return createStore
}