
const serverState:ServerState = {
  currentCustomerId: null,
  customers: [],
  cart: [],
  products: [
    {
      id: '1',
      containerID: '1',
      name: 'Shirt',
      price: 20,
      color: 'blue',
      size: 42
    },
    {
      id: '2',
      containerID: '2',
      name: 'Pants',
      price: 30,
      color: 'black',
      size: 32
    }
  ]
}


export default serverState


export type ServerState = {
  products: Product[]
  customers: Customer[]
  cart: Cart
  currentCustomerId: string | null
}

export type Cart = {
  productID: string
  amount: number
}[]

export type Customer = {
  id: string
  name: string
  email: string
  password: string
}

export type Product = {
  id: string
  containerID: string
  name: string
  price: number
  color: string
  size: number
}