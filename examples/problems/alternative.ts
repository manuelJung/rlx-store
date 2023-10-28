const createStore:any = null

type FilterValues = {
  query: string
  page: number
}

export default function getProductList() {
  return createStore('productList', '', store => {
    store = store.addState({
      data: null as null | string[],
      isFetching: false,
      fetchError: null as string | null,
      filterValues: {
        query: '',
        page: 0,
      } satisfies FilterValues as FilterValues
    })

    store = store.addAsyncAction('fetch', () => ({
      fetcher: (state) => fetch(state.filterValues),
      mapResponse: (response, state) => ({
        ...state,
        data: response.hits,
        filterOptions: response.filterOptions,
      })
    }))

    store = store.addAction('setQuery', (query:string) => ({
      lense: 'filterValues',
      update: filterValues => ({...filterValues, query}),
      afterUpdate: store => store.fetch(),
    }))

    store = store.addAction('setPage', (page:number) => ({
      lense: 'filterValues',
      update: filterValues => ({...filterValues, page}),
      afterUpdate: store => store.fetch(),
    }))

    return store
  })
}

// interface StoreConfig<State> {
//   state: State
//   actions: () => Record<string, () => ReturnType<typeof createAsync>>
//   // fn: () => ReturnType<typeof createAsync>
// }

// function createAsync <State>(config:{
//   fn: (state:State) => State
// }) {
//   return null
// }

// class Store<State> {
//   constructor (config:{
//     state:State
//     actions: Record<string, () => ReturnType<typeof createAsync>>
//   }) {

//   }
// }

// const store = new Store({
//   state: { foo: 'bar' as const },
//   actions: {
//     fn: () => createAsync<ThisParameterType<Store>>({
//       fn: state => state
//     })
//   }
// })