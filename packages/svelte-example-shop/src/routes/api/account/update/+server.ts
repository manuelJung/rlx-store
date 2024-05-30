import serverState, { type Customer } from '../../../../server-state.js';
import Schema from 'validate'

const schema = new Schema({
  name: {
    type: 'string',
    required: false
  },
})

/** @type {import('./$types').RequestHandler} */
export async function POST (params) {
  const body = await params.request.json() as { 
    name?: string
  }

  const errors = schema.validate(body)
  if (errors.length) {
    return new Response(JSON.stringify(errors), { status: 400 })
  }

  if(serverState.currentCustomerId === null) {
    return new Response(JSON.stringify({error: 'Not logged in'}), { status: 401 })
  }

  const customer = serverState.customers.find(c => c.id === serverState.currentCustomerId)

  if (!customer) {
    return new Response(JSON.stringify({error: 'Customer does not exist'}), { status: 400 })
  }

  if(body.name) customer.name = body.name

  return new Response(JSON.stringify(customer))
}