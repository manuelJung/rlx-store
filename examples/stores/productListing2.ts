
const createStore:<T>(o:any)=>any = ()=>null
const createAsync:<T>(o:any)=>any = ()=>null
const createSync:<T>(o:any)=>any = ()=>null

type FilterValues = {
  query: string
  page: number
}

export default function createProductList (key:string) {
  const store = createStore({
    name: 'productListing',
    key: key,
    state: {
      data: null as null | string[],
      isFetching: false,
      fetchError: null as string | null,
      filterValues: {
        query: '',
        page: 0,
      } satisfies FilterValues as FilterValues
    },
    actions: {
      fetch: () => ({
        triggerOnSetup: true,
        fetcher: (state) => fetch(state.filterValues),
        mapResponse: (response, state) => ({
          ...state,
          data: response.hits,
          filterOptions: response.filterOptions,
        })
      }),
      setQuery: (query:string) => ({
        lense: ['filterValues', 'query'],
        updater: () => query,
      }),
      setPage: (page:number) => ({
        lense: 'filterValues',
        updater: filterValues => ({...filterValues, page}),
      })
    },
    rules: createRule => {
      createRule({
        id: 'fetcher',
        target: ['/setQuery', '/setPage'],
        concurrency: 'SWITCH',
        consequence: args => args.store.fetch()
      })
    }
  })
}


async function fetch (filterValues: FilterValues) {

}