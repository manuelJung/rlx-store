import * as t from "./types"
import { createAction, createEventContainer } from "./utils"

export default function createStoreManager(
  args: t.FactoryArgs,
  managers: t.Managers
) {
  const db = new Map<string, t.StoreContainer>()

  return {
    db,
    create: (config: t.StoreConfig) => {
      const storeId = config.name + (config.key ?? '')
      const container = db.get(storeId) ?? (() => {
        const container: t.StoreContainer = {
          id: storeId,
          state: config.state,
          numParents: 0,
          subscriptions: [],
          events: createEventContainer(),
          store: args.injectFramework({
            actions: {},
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
          const actionBaseArgs = { container, containerDb: db, managers, storeConfig: config}
          const actionReturn = config.actions[key]()
          if(typeof actionReturn === 'function') {
            container.store.actions[key] = createAction(key, {
              ...actionBaseArgs,
              updateFn: config.actions[key],
            })
          }
          else {
            const actionConfig = actionReturn
            const getM = (config:t.AsyncActionConfig) => ({
              data: config.mappings?.data ?? 'data',
              isFetching: config.mappings?.isFetching ?? 'isFetching',
              fetchError: config.mappings?.fetchError ?? 'fetchError',
            })
            container.store.actions[key] = createAction(key+'/request', {
              ...actionBaseArgs,
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
              ...actionBaseArgs,
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
              ...actionBaseArgs,
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
              output: [`/${key}/success`, `/${key}/failure`],
              concurrency: actionConfig.concurrency ?? 'SWITCH',
              throttle: actionConfig.throttle,
              debounce: actionConfig.debounce,
              consequence: args => actionConfig.fetcher(args.store.getState()).then(
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

            if(actionConfig.triggerOnMount) {
              container.store.addRule({
                id: key + '/on-mount',
                target: `/@mount`,
                output: `/${key}/request`,
                consequence: args => args.store.actions[key]()
              })
            }
          }
        }

        // on server we do not need to subscribe to the store
        if(typeof window !== 'undefined') {
          args.onMount(() => {
            container.numParents++
            managers.rule.dispatch({
              action: {
                type: config.name + "/@mount",
                meta: [],
                payload: null,
              },
              storeContainer: container,
              storeDb: db,
              cb: () => null
            })
            container.events.trigger({ type: "MOUNT" })
          })
  
          args.onDestroy(() => {
            container.numParents--
            managers.rule.dispatch({
              action: {
                type: config.name + "/@destroy",
                meta: [],
                payload: null,
              },
              storeContainer: container,
              storeDb: db,
              cb: () => null
            })
  
            if (container.numParents === 0 && !config.persist) {
              container.events.trigger({ type: "DESTROY" })
              db.delete(storeId)
            }
          })
        }

        db.set(storeId, container)
        managers.events.trigger({ type: "REGISTER_STORE", container })
        return container
      })()

      return container.store
    },
  }
}

