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
      fetch: () => ({
        triggerOnMount: true,
        concurrency: 'SWITCH',
        fetcher: state => fetchProducts(state.filterValues),
        mapResponse: (response, state) => ({
          ...state,
          data: response.hits,
          isFetching: false,
        })
      }),
      /** my comment */
      setFilterValue: (key: keyof FilterValues, value: string) => state => ({
        filterValues: {
          ...state.filterValues,
          [key]: value
        }
      })
    }
  })

  store.addRule({
    id: 'trigger-fetch',
    target: '/setFilterValue',
    consequence: (args) => args.store.actions.fetch()
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