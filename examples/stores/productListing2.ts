import * as React from 'react'
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
      setPage2: (page:number) => state => ({
        ...state,
        filterValues: {
          ...state.filterValues,
          page: page,
        }
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

  const identity = (x:any) => x

  return {
    ...store,
    useState (selector=identity, equalityFn) {
      const [i, setI] = React.useState(0)
      const equalityCache = equalityFn ? equalityFn(store.getState()) : []
      const equalityCacheRef = React.useRef(equalityCache)
      equalityCacheRef.current = equalityCache
      const result = React.useMemo(() => {
        return selector(store.getState())
      }, equalityFn ? [...equalityCache] : [i])

      React.useEffect(() => {
        return store.subscribe(() => {
          
          if(!equalityFn) {
            setI(i => {
              const newState = selector(store.getState())
              if(shallowEqual(result, newState)) return i
              return i+1
            })
          }
          else {
            setI(i => {
              const newEqualityCache = equalityFn(store.getState())
              const oldEqualityCache = equalityCacheRef.current
              if(shallowEqual(newEqualityCache, oldEqualityCache)) return i
              return i+1
            })
          }

        })
      }, [])

      return result
    }
  }
}

function shallowEqual (a:any, b:any) {
  if(a === b) return true
  if(typeof a !== 'object' || typeof b !== 'object') return false
  if(a === null || b === null) return false
  if(Array.isArray(a)) {
    if(!Array.isArray(b)) return false
    if(a.length !== b.length) return false
    for(let i=0; i<a.length; i++) {
      if(a[i] !== b[i]) return false
    }
    return true
  }
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if(aKeys.length !== bKeys.length) return false
  for(let i=0; i<aKeys.length; i++) {
    const key = aKeys[i]
    if(a[key] !== b[key]) return false
  }
  return true
}


async function fetch (filterValues: FilterValues) {

}