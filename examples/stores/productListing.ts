import createFetchStore from "../composit/createFetchStore";


export default function getProductListingStore (identifier:string, initialState:any) {
  const store = createFetchStore({
    name: 'listing',
    key: identifier,
    state: initialState,
    filters: {
      page: 0 as number,
      color: null as string | null,
    },
    filterOptions: {
      maxPage: 10,
      color: [] as string[]
    },
    actions: {
      setPage: (n:number) => state => ({
        filters: {
          ...state.filters,
          page: n,
        }
      }),
      setColor: (s:string | null) => state => ({
        filters: {
          ...state.filters,
          color: s
        }
      })
    },
    fetchFn: async filters => {
      return {
        data: [],
        options: {
          maxPage: 10,
          color: []
        }
      }
    }
  })

  return store
}