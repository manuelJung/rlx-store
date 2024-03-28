import serverState from '../../../../server-state.js';
import Schema from 'validate'

const schema = new Schema({
  productID: {
    type: 'string',
    required: true
  },
  amount: {
    type: 'number',
    required: true
  }
})

/** @type {import('./$types').RequestHandler} */
export async function POST (params) {
  const body = await params.request.json() as { productID: string, amount: number }

  const errors = schema.validate(body)
  if (errors.length) {
    return new Response(JSON.stringify(errors), { status: 400 })
  }

  if (serverState.cart.find(item => item.productID === body.productID)) {
    serverState.cart = serverState.cart.map(item => {
      if (item.productID === body.productID) {
        item.amount = body.amount
      }
      return item
    })
  }
  else {
    return new Response(JSON.stringify({error: 'Product not found in cart'}), { status: 400 })
  }


  return new Response(JSON.stringify(serverState.cart))
}