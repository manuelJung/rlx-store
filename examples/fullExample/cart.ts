const createStore:any = null
const produce:any = null

type ErrorFn = (key:string) => void

export type CartItem = {
  sku: string
  amount: number
  isUpdating: boolean
  isRemoving: boolean
  isAdding: boolean
}

export type Cart = {
  price: number
  items: CartItem[]
}


export default function createCartStore () {
  const store = createStore({
    name: 'cart',
    state: {
      isInitialFetching: false,
      data: getEmptyCart(),
    },
    actions: {
      fetch: () => ({
        fields: {isFetching: 'isInitialFetching'},
        fetcher: fetchCart,
      }),
      updateItemAmount: (item:CartItem, amount:number) => ({
        fetcher: () => updateItemAmount(item, amount),
        throttle: 300,
        concurrency: 'LAST',
        optimisticUpdate: produce(state => {
          const draft = state.data.items.find(o => o.sku === item.sku)
          if(!draft) return
          draft.isUpdating = true
          draft.amount = amount
        }),
      }),
      addItem: (sku:string, amount:number) => ({
        fetcher: (_, error) => addItem(sku, amount, error),
        optimisticUpdate: produce(state => {
          state.data.items.push({sku,amount, isAdding: true})
        }),
      }),
      removeItem: (item:CartItem) => ({
        fetcher: () => removeItem(item),
        optimisticUpdate: produce(state => {
          const draft = state.data.items.find(o => o.sku === item.sku)
          if(!draft) return
          draft.isRemoving = true
        }),
      }),
    }
  })

  store.addRule({
    name: 'updateOnLogin',
    target: ['account/initialFetchSuccess', 'account/loginSuccess'],
    output: '/fetch',
    consequence: ({store}) => store.actions.fetch(),
  })

  return store
}

function getEmptyCart ():Cart {
  return {
    items: [],
    price: 0,
  }
}

async function fetchCart () {
  return getEmptyCart()
}

async function updateItemAmount (item:CartItem, amount:number) {
  return fetchCart()
}

async function addItem (sku:string, amount:number, error:ErrorFn) {
  throw error('my custom error')
  return fetchCart()
}

async function removeItem (item:CartItem) {
  return fetchCart()
}