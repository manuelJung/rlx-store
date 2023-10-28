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
          const updateState = (nextState:any) => {
            if(typeof nextState !== 'object') container.state = nextState
            else if(nextState === null) container.state = nextState
            else if(Array.isArray(nextState)) container.state = nextState
            else container.state = {...container.state, ...nextState}
            for (const fn of container.subscriptions) fn(container.state)
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
                return dispatch(key, args[0], () => updateState(updateFn(container.state)))
              } else {
                return new Promise<boolean>(resolve => {
                  const m = {
                    data: updateFn.mappings?.data ?? 'data',
                    isFetching: updateFn.mappings?.isFetching ?? 'isFetching',
                    fetchError: updateFn.mappings?.fetchError ?? 'fetchError',
                  }
                  const requestPayload = updateFn.optimisticData
                    ? updateFn.optimisticData(container.state)
                    : undefined
                  const prevData = container.state[m.data]
                  dispatch(key+'/request', requestPayload, () => {
                    updateState({
                      ...(m.isFetching in container.state ? {[m.isFetching]:true}: {}),
                      ...(m.fetchError in container.state ? {[m.fetchError]:null}: {}),
                      [m.data]: requestPayload ?? prevData,
                    })
                    updateFn.fetcher(container.state).then(
                      result => dispatch(key+'/success', result, () => {
                        if(updateFn.mapResponse) {
                          updateState({
                            ...(m.isFetching in container.state ? {[m.isFetching]:false}: {}),
                            ...updateFn.mapResponse(result, container.state),
                          })
                        }
                        else {
                          updateState({
                            ...(m.isFetching in container.state ? {[m.isFetching]:false}: {}),
                            [m.data]: result
                          })
                        }
                        resolve(true)
                      }),
                      error => dispatch(key+'/failure', error, () => {
                        updateState({
                          ...(m.isFetching in container.state ? {[m.isFetching]:false}: {}),
                          ...(m.fetchError in container.state ? {[m.fetchError]:error}: {}),
                          ...(requestPayload ? {[m.data]:prevData} : {}),
                        })
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
