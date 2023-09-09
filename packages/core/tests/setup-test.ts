import * as t from '../src/types'
import factory from '../src/index'

type Config = {
  instanceId?: string
  preventAutoMount?: boolean
}

export default function setupTest (config:Config={}) {
  let mountFnRef = {
    current: () => {}
  }
  let destroyFnRef = {
    current: () => {}
  }
  const createStore = factory({
    injectFramework: store => store,
    getInstanceId: () => config.instanceId ?? '',
    onDestroy: cb => {
      destroyFnRef.current = () => cb()
    },
    onMount: cb => {
      mountFnRef.current = () => cb()
    }
  })

  /**
   * mocks
   */
  createStore.managers.rule.dispatch = jest.fn(createStore.managers.rule.dispatch)
  createStore.managers.rule.register = jest.fn(createStore.managers.rule.register)
  createStore.managers.events.trigger = jest.fn(createStore.managers.events.trigger)

  createStore.managers.events.on('REGISTER_STORE', ({container}) => {
    container.events.trigger = jest.fn(container.events.trigger)
    container.store.subscribe = jest.fn(container.store.subscribe)
  })

  createStore.managers.events.on('REGISTER_RULE', ({container}) => {
    container.events.trigger = jest.fn(container.events.trigger)
    container.rule.consequence = jest.fn(container.rule.consequence)
  })

  return {
    createStore: (storeConfig:Partial<t.StoreConfig>) => {
      const store = createStore({
        name: 'test-store',
        actions: {},
        state: null,
        ...storeConfig,
      }) as ReturnType<typeof createStore> & Record<string, (...args:any[]) => any>

      if(!config.preventAutoMount) mountFnRef.current()

      return store
    },
    mountFnRef,
    destroyFnRef,
    managers: createStore.managers,
  }
}
