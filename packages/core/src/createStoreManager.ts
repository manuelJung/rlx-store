import * as t from "./types"
import { createEventContainer } from "./utils"

export default function createStoreManager(
  args: t.FactoryArgs,
  managers: t.Managers
) {
  const db = new Map<string, t.StoreContainer>()
  let keyCounter = 1

  return {
    db,
    create: (config: t.StoreConfig) => {
      const storeId =
        config.name +
        (config.key ?? args.getInstanceId(() => `${keyCounter++}`))
      const container =
        db.get(storeId) ??
        (() => {
          const container: t.StoreContainer = {
            id: storeId,
            state: config.state,
            numParents: 0,
            subscriptions: [],
            events: createEventContainer(),
            store: args.injectFramework({
              name: config.name,
              key: config.key,
              getState: () => container.state,
              addRule: (rule) => managers.rule.register(rule, container),
              subscribe: (cb) => {
                container.subscriptions.push(cb)
                return () => {
                  container.subscriptions = container.subscriptions.filter(
                    (fn) => fn != cb
                  )
                }
              },
            }),
          }

          // transform actions
          for (const key in config.actions) {
            container.store[key] = function (...args: any[]) {
              const store = this as t.Store
              /** consequence can attach action execution */
              const wrapper = store.dispatchWrapper ?? ((fn) => fn())
              const dispatch = (key: string, payload: any, cb: any) => wrapper(() => {
                managers.rule.dispatch(
                  {
                    type: config.name + "/" + key,
                    meta: args,
                    payload,
                  },
                  container,
                  db,
                  cb
                )
              })
              const updateFn = config.actions[key](...args)

              if (typeof updateFn === "function") {
                return dispatch(key, args[0], () => container.state = updateFn(container.state))
              } else {
                return new Promise(resolve => {
                  dispatch(key+'/request', null, () => {
                    const m = {
                      data: updateFn.mappings?.data ?? 'data',
                      isFetching: updateFn.mappings?.isFetching ?? 'isFetching',
                      fetchError: updateFn.mappings?.fetchError ?? 'fetchError',
                    }
                    container.state = {
                      ...container.state,
                      ...(m.isFetching in container.state ? {[m.isFetching]:true}: {}),
                      ...(m.fetchError in container.state ? {[m.fetchError]:null}: {}),
                    }
                    updateFn.fetcher(container.state).then(
                      result => dispatch(key+'/success', result, () => {
                        container.state = {
                          ...container.state,
                          ...(m.isFetching in container.state ? {[m.isFetching]:false}: {}),
                          ...(m.data in container.state ? {[m.data]:result}: {}),
                        }
                        resolve(true)
                      }),
                      error => dispatch(key+'/failure', error, () => {
                        container.state = {
                          ...container.state,
                          ...(m.isFetching in container.state ? {[m.isFetching]:false}: {}),
                          ...(m.fetchError in container.state ? {[m.fetchError]:error}: {}),
                        }
                        resolve(false)
                      })
                    )
                  })
                })
              }
            }
          }

          args.onMount(() => {
            container.numParents++
            managers.rule.dispatch(
              {
                type: config.name + "/@mount",
                meta: [],
                payload: null,
              },
              container,
              db,
              () => null
            )
            container.events.trigger({ type: "MOUNT" })
          })

          args.onDestroy(() => {
            container.numParents--
            managers.rule.dispatch(
              {
                type: config.name + "/@destroy",
                meta: [],
                payload: null,
              },
              container,
              db,
              () => null
            )

            if (container.numParents === 0 && !config.persist) {
              container.events.trigger({ type: "DESTROY" })
              db.delete(storeId)
            }
          })

          db.set(storeId, container)
          managers.events.trigger({ type: "REGISTER_STORE", container })
          return container
        })()

      return container.store
    },
  }
}
