import createStore from "@rlx/svelte";

export default function createCartStore () {
  const store = createStore({
    name: 'cart',
    persist: true,
    state: {
      items: [] as string[],
      initiallyFetched: false,
      fetchError: null as string | null,
      isUpdating: false,
      updateError: null as string | null,
    },
    actions: {
      initialFetch: () => ({
        triggerOnMount: true,
        fetcher: () => fetch('/api/cart'),
        mapResponse: r => ({ items: r.items, initiallyFetched: true }),
      }),
      addItem: (productID: string, amount:number) => ({
        fetcher: () => fetch('/api/cart/add', { productID, amount }),
        mappings: { data: 'items', isFetching: 'isUpdating', fetchError: 'updateError' },
        concurrency: 'FIRST',
      }),
      removeItem: (productID: string) => ({
        fetcher: () => fetch('/api/cart/remove', { productID }),
        mappings: { data: 'items', isFetching: 'isUpdating', fetchError: 'updateError' },
        concurrency: 'FIRST',
      }),
      setItemAmount: (productID: string, amount:number) => ({
        fetcher: () => fetch('/api/cart/set', { productID, amount }),
        mappings: { data: 'items', isFetching: 'isUpdating', fetchError: 'updateError' },
        concurrency: 'FIRST',
      }),
    }
  })

  store.addRule({
    id: 'log-user',
    target: 'account/login/success',
    consequence: ({action, store}) => store.actions.initialFetch()
  })

  return store
}

function fetch(url: string, body:any=null) {
  return window.fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json())
}