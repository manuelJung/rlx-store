import * as t from "./types"
import { createAction, createEventContainer } from "./utils"

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
          for(const key in config.actions) {
            const result = config.actions[key]()
            if(typeof result === 'function') {
              container.store[key] = createAction(key, {
                container,
                containerDb: db,
                managers,
                storeConfig: config,
                updateFn: config.actions[key],
              })
            }
            else {
              const getM = (config:t.AsyncActionConfig) => ({
                data: config.mappings?.data ?? 'data',
                isFetching: config.mappings?.isFetching ?? 'isFetching',
                fetchError: config.mappings?.fetchError ?? 'fetchError',
              })
              container.store[key] = createAction(key+'/request', {
                container,
                containerDb: db,
                managers,
                storeConfig: config,
                updateFn: config.actions[key],
                isRequestStage: true,
                onExecute: config => state => {
                  const m = getM(config)
                  const requestPayload = config.optimisticData
                    ? config.optimisticData(state)
                    : undefined
                  return {
                    ...(m.isFetching in state ? {[m.isFetching]:true}: {}),
                    ...(m.fetchError in state ? {[m.fetchError]:null}: {}),
                    [m.data]: requestPayload ?? state[m.data],
                  }
                }
              })
              const successAction = createAction(key+'/success', {
                container,
                containerDb: db,
                managers,
                storeConfig: config,
                dispatchWrapper: fn => fn(),
                updateFn: config.actions[key],
                onExecute: (config, result) => state => {
                  const m = getM(config)
                  if(config.mapResponse) {
                    return ({
                      ...(m.isFetching in state ? {[m.isFetching]:false}: {}),
                      ...config.mapResponse(result, state),
                    })
                  }
                  else {
                    return ({
                      ...(m.isFetching in state ? {[m.isFetching]:false}: {}),
                      [m.data]: result,
                    })
                  }
                }
              })
              const failureAction = createAction(key+'/failure', {
                container,
                containerDb: db,
                managers,
                storeConfig: config,
                dispatchWrapper: fn => fn(),
                updateFn: config.actions[key],
                onExecute: (config, error) => state => {
                  const m = getM(config)
                  const resetData = error.resetData
                  return {
                    ...(m.isFetching in state ? {[m.isFetching]:false}: {}),
                    ...(m.fetchError in state ? {[m.fetchError]:error}: {}),
                    [m.data]: resetData ?? state[m.data],
                  }
                }
              })
              container.store.addRule({
                id: key,
                target: `/${key}/request`,
                concurrency: result.concurrency ?? 'SWITCH',
                throttle: result.throttle,
                debounce: result.debounce,
                consequence: args => result.fetcher(args.store.getState()).then(
                  result => {
                    args.effect(() => successAction(result, ...args.action.meta))
                    if(args.action._promiseResolve) args.action._promiseResolve(true)
                  },
                  error => {
                    args.effect(() => {
                      error.resetData = args.action._resetData
                      failureAction(error, ...args.action.meta)
                      delete error.resetData
                    })
                    if(args.action._promiseResolve) args.action._promiseResolve(false)
                  },
                )
              })
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

