import Schema from 'validate';
import serverState from '../../../server-state.js';

const schema = new Schema({
  color: {
    type: 'string',
    required: false
  },
  search: {
    type: 'string',
    required: false
  },
  containerID: {
    type: 'string',
    required: false
  }
})

/** @type {import('./$types').RequestHandler} */
export async function fallback (params) {
  const body = await params.request.json() as {
    color?: string
    search?: string
    containerID?: string
  }

  const errors = schema.validate(body)
  if (errors.length) {
    return new Response(JSON.stringify(errors), { status: 400 })
  }

  const products = serverState.products.filter(product => {
    if (body.color && product.color !== body.color) return false
    if (body.search && !product.name.includes(body.search)) return false
    if (body.containerID && product.containerID !== body.containerID) return false
    return true
  })

  return new Response(JSON.stringify({
    hits: products
  }))
}