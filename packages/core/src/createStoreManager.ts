import * as t from './types'
import { createEventContainer } from './utils'

export default function createStoreManager (args:t.FactoryArgs, managers:t.Managers) {
  const db = new Map<string, t.StoreContainer>()
  let keyCounter = 1

  return {
    db,
    create: (config:t.StoreConfig) => {
      const storeId = config.name + (config.key ?? args.getInstanceId(() => `${keyCounter++}`))
      const container = db.get(storeId) ?? (() => {
        const container:t.StoreContainer = {
          id: storeId,
          state: config.state,
          numParents: 0,
          subscriptions: [],
          events: createEventContainer(),
          store: args.injectFramework({
            name: config.name,
            key: config.key,
            getState: () => container.state,
            addRule: rule => managers.rule.register(rule, container),
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

            const result = managers.rule.dispatch(
              action, 
              () => {
                const updateFn = config.actions[key](...args)
                container.state = updateFn(container.state)
              },
              container
            )
            return result
          }
        }

        args.onMount(() => {
          container.numParents++
          managers.rule.dispatch(
            {
              type: config.name + '/@mount',
              meta: [],
              payload: null
            }, 
            () => null,
            container,
          )
          container.events.trigger({type: 'MOUNT'})
        })

        args.onDestroy(() => {
          container.numParents--
          managers.rule.dispatch(
            {
              type: config.name + '/@destroy',
              meta: [],
              payload: null
            }, 
            () => null, 
            container
          )

          if(container.numParents === 0 && !config.persist) {
            container.events.trigger({type: 'DESTROY'})
            db.delete(storeId)
          }
        })

        db.set(storeId, container)
        managers.events.trigger({type: 'REGISTER_STORE', container})
        return container
      })()

      return container.store
    }
  }
}