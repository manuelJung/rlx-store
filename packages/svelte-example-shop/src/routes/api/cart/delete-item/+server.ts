import serverState from '../../../../server-state.js';
import Schema from 'validate'

const schema = new Schema({
  productID: {
    type: 'string',
    required: true
  },
})

/** @type {import('./$types').RequestHandler} */
export async function POST (params) {
  const body = await params.request.json() as { productID: string }

  const errors = schema.validate(body)
  if (errors.length) {
    return new Response(JSON.stringify(errors), { status: 400 })
  }

  const prevLength = serverState.cart.length
  serverState.cart = serverState.cart.filter(item => item.productID !== body.productID)

  if (prevLength === serverState.cart.length) {
    return new Response(JSON.stringify({error: 'Product not found in cart'}), { status: 400 })
  }

  return new Response(JSON.stringify(serverState.cart))
}