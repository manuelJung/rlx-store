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
    getInstanceId: () => config.instanceId ?? '',
    onDestroy: destroyFn,
    onMount: mountFn
  })

  /**
   * mocks
   */
  createStore.managers.effect.dispatch = jest.fn(createStore.managers.effect.dispatch)
  createStore.managers.effect.register = jest.fn(createStore.managers.effect.register)
  createStore.managers.events.trigger = jest.fn(createStore.managers.events.trigger)

  createStore.managers.events.on('REGISTER_STORE', ({container}) => {
    container.events.trigger = jest.fn(container.events.trigger)
    container.store.subscribe = jest.fn(container.store.subscribe)
  })

  createStore.managers.events.on('REGISTER_EFFECT', ({container}) => {
    container.events.trigger = jest.fn(container.events.trigger)
    container.effect.consequence = jest.fn(container.effect.consequence)
  })

  return {
    createStore: (config:Partial<t.StoreConfig>) => createStore({
      name: 'test-store',
      actions: {},
      state: null,
      ...config,
    }) as ReturnType<typeof createStore> & Record<string, (...args:any[]) => any>,
    managers: createStore.managers,
  }
}
