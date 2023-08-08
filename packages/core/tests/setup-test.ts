import * as t from '../src/types'
import factory from '../src/index'

type Config = {
  instanceId?: string
}

export default function setupTest (config:Config={}) {
  const destroyFn = jest.fn().mockImplementation(cb => cb())
  const mountFn = jest.fn().mockImplementation(cb => cb())
  const createStore = factory({
    injectFramework: store => store,
    getInstanceId: () => config.instanceId ?? '1',
    onDestroy: destroyFn,
    onMount: mountFn
  })

  return {
    createStore,
    createPartialStore: (config:Partial<t.StoreConfig>) => createStore({
      name: 'test-store',
      actions: {},
      state: null
    }),
    managers: createStore.managers
  }
}