import createStore from "examples/react/createStore"

export default function createFetchStore<T, F = void, O = void>(config:any) {
  const store = createStore({
    ...config,
    state: {
      hits: null as T | null,
      isFetching: false,
      fetchError: null as null | string,
      hasFetched: false,
      filters: config.filters as F,
      filterOptions: config.filterOptions as O,
      ...config.state,
    },
    actions: {
      fetch: (payload) => createAsync({
        mappings: {data: 'hits'},
        fetcher: state => config.fetchFn(payload),
        mapResponse: result => ({
          hits: result.hits,
          filterOptions: result.filterOptions,
        })
      }),
      fetchRequest: (payload:F) => state => ({
        isFetching: true,
        fetchError: null,
      }),
      fetchSuccess: (result:{ data: T, options: O, }) => state => ({
        isFetching: false,
        filterOptions: result.options,
        data: result.data,
      }),
      fetchFailure: (error:Error) => state => ({
        isFetching: false,
        fetchError: error.toString(),
      }),
      ...config.actions
    }
  })

  store.addRule({
    name: 'fetch',
    target: '/fetchRequest',
    effect: (action, store) => config.fetchFn(action.payload).then(store.fetchSuccess, store.fetchFailure)
  })

  store.addRule({
    name: 'setup',
    target: '/@init',
    condition: () => !config.preventInitialFetch,
    effect: (_, store) => store.fetchRequest(store.getState().filters)
  })

  return store
}