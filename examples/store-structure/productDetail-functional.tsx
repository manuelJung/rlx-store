import React from "react"

const createStore:any = null

type DetailProduct = {
  containerID: string
  sku: string
  filters: Filters
}

type Filters = {
  containerID: string
  variant: string | null
  style: string | null
  size: string | null
  color: string | null
}

export default function productDetailStore () {
  const containerID = useContainerId()

  const store = createStore('productDetail', containerID)
    .withState({
      products: [] as DetailProduct[],
      isFetching: null,
      fetchError: null as null | Error,
      filters: {
        containerID,
        variant: null,
        style: null,
        size: null,
        color: null,
      } as Filters
    })
    .withAsyncAction('fetch', () => ({
      mappings: {data:'products'},
      triggerOnMount: true,
      fetcher: state => fetch(state.filters),
    }))
    .withAction('setFilters', (filters:Partial<Filters>) => ({
      lense: 'filters',
      updater: () => filters
    }))

  

  const store2 = createStore(
    state({
      products: [] as DetailProduct[],
      isFetching: null,
      fetchError: null as null | Error,
      filters: {
        containerID,
        variant: null,
        style: null,
        size: null,
        color: null,
      } as Filters
    }),
    fetch(state => fetch(state.filterValues)),
    action('setFilters', (filters:Partial<Filters>) => ({
      lense: 'filters',
      updater: () => filters
    })),
  )('productDetail', containerID)

  return store
}

const fetch = (fetchFn) => asyncAction('fetch', {
  mappings: {data:'products'},
  triggerOnMount: true,
  fetcher: state => fetchFn(state.filters),
})

const Context = React.createContext('')

function useContainerId () {
  const id = React.useContext(Context)
  if(!id) throw new Error('productDetailStore: no containerID provided')
  return id
}

export function ContainerIdProvider (props:{containerID:string, children:any}) {
  return <Context.Provider value={props.containerID}>{props.children}</Context.Provider>
}

export function useDisplayVariant ():DetailProduct|null {
  const store = productDetailStore()

  return store.useState({
    getId: state => state.containerID,
    query: state => {
      const {products, filters} = state
      const match = (key:keyof Filters, product:DetailProduct) => {
        if(!filters[key]) return true
        if(!product.filters[key]) return true
        return filters[key] === product.filters[key]
      }
      for(const product of products) {
        if(!match('color', product)) continue
        if(!match('variant', product)) continue
        if(!match('style', product)) continue
        if(!match('size', product)) continue
        return product
      }
      return null
    }
  })
}

async function fetch (filters:Filters):Promise<DetailProduct[]> {
  return []
}