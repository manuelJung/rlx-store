import createStore from "@rlx/svelte"
import type { Product } from "../../server-state"

export type FilterValues = {
  search: string
  color: string
}

declare global {
  interface RlxStores {
    products: ReturnType<typeof createProductStore>
  }
}

export default function createProductStore(name:string, filterValues: Partial<FilterValues> = {}) {
  const store = createStore({
    name: 'products',
    key: name,
    state: {
      data: [] as Product[],
      isFetching: false,
      fetchError: null as string | null,
      filterValues: {
        search: '',
        color: '',
        ...filterValues
      } satisfies FilterValues as FilterValues
    },
    actions: {
      fetchRequest: () => state => ({
        isFetching: true,
        fetchError: null
      }),
      fetchSuccess: (products: Product[]) => state => ({
        isFetching: false,
        data: products
      }),
      fetchError: (error: string) => state => ({
        isFetching: false,
        fetchError: error
      }),
      setFilterValue: (key: keyof FilterValues, value: string) => state => ({
        filterValues: {
          ...state.filterValues,
          [key]: value
        }
      })
    }
  })

  console.log('rendering')

  store.addRule({
    // @ts-expect-error
    id: 'fetch',
    target: '/fetchRequest',
    consequence: (args) => {
      const state = args.store.getState()
      return fetchProducts(state.filterValues).then(
        result => args.store.actions.fetchSuccess(result.hits),
        error => args.store.actions.fetchError(error.message)
      )
    }
  })

  store.addRule({
    id: 'trigger-fetch',
    // @ts-expect-error
    target: ['/@mount', '/setFilterValue'],
    consequence: (args) => args.store.actions.fetchRequest()
  })

  return store
}

async function fetchProducts(filterValues: FilterValues) {
  const url = new URL('/api/products', window.location.href)

  const body = JSON.stringify(filterValues)

  return fetch(url, {method: 'POST', body}).then(res => res.json()) as Promise<{
    hits: Product[]
  }>
}