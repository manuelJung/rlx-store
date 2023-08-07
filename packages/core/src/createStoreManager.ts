import * as t from './types'

export default function createStoreManager (args:t.FactoryArgs, managers:t.Managers) {
  const db = new Map<string, t.StoreContainer>()
  let keyCounter = 1

  return {
    create: (config:t.StoreConfig) => {
      const storeId = config.name + (config.key ?? args.getInstanceId(() => `${keyCounter++}`))
      const container = db.get(storeId) ?? (() => {
        const container:t.StoreContainer = {
          id: storeId,
          state: config.state,
          numParents: 0,
          subscriptions: [],
          store: args.injectFramework({
            name: config.name,
            key: config.key,
            getState: () => container.state,
            sideEffect: effect => managers.effect.register(effect, container),
            subscribe: cb => {
              container.subscriptions.push(cb)
              return () => {
                container.subscriptions = container.subscriptions.filter(fn => fn != cb)
              }
            }
          })
        }

        // transform actions
        for(const key in config.actions) {
          container.store[key] = (...args:any[]) => {
            const action = {
              type: config.name + '/' + key,
              meta: args,
              payload: args[0],
            }

            managers.effect.dispatch(action, () => {
              const updateFn = config.actions[key](...args)
              container.state = updateFn(container.state)
            })
          }
        }

        args.onMount(() => {
          container.numParents++
          managers.effect.dispatch({
            type: config.name + '/@mount',
            meta: [],
            payload: null
          }, () => null)
        })

        args.onDestroy(() => {
          container.numParents--
          managers.effect.dispatch({
            type: config.name + '/@destroy',
            meta: [],
            payload: null
          }, () => null)

          if(container.numParents === 0 && !config.persist) {
            db.delete(storeId)
          }
        })

        db.set(storeId, container)
        return container
      })()

      return container.store
    }
  }
}