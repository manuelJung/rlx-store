
declare global {
  interface RlxStore {
    cartStore: ReturnType<typeof getCartStore>
  }
}

export type CartItemPlaceholder = {
  type: 'placeholder'
}

export type CartItem = {
  type: 'item'
  sku: string
  amount: number
  price: number
} | CartItemPlaceholder

export type Cart = {
  items: CartItem[]
  price: number
}

export type AddItemArgs = {
  sku: string
  amount: number
}

const createAsync:any = null
const createStore:any = null

export default function getCartStore () {
  const store = createStore({
    name: 'cart',
    key: '',
    state: { data: emptyCart(), isAdding: false, isFetching: true },
    actions: {
      addItem: (args:AddItemArgs) => createAsync({
        mappings: { isFetching: 'isAdding' },
        optimisticData: () => [],
        fetcher: async () => [],
      }),
      fetch: () => createAsync({
        fetcher: fetchCart,
      }),
    },
  })

  // const arg:AddItemArgs = {amount:1, sku:'123'}
  // store.addItem(arg)

  // const requestAction = {
  //   type: 'cart/addItem/request',
  //   meta: [arg],
  //   optimisticData: []
  // }
  // const successAction = {
  //   type: 'car/addItem/success',
  //   meta: [arg],
  //   payload: [],
  // }
  // const failureAction = {
  //   type: 'cart/addItem/failure',
  //   meta: [arg],
  //   payload: "An error happened",
  // }

  return store
}

function emptyCart ():Cart {
  return {
    items: [],
    price: 0,
  }
}

async function fetchCart ():Promise<Cart> {
  return {
    items: [],
    price: 0,
  }
}