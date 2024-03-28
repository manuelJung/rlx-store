import serverState, { type Customer } from '../../../../server-state.js';
import Schema from 'validate'

const schema = new Schema({
  email: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  }
})

/** @type {import('./$types').RequestHandler} */
export async function POST (params) {
  const body = await params.request.json() as { 
    email: string
    password: string
  }

  const errors = schema.validate(body)
  if (errors.length) {
    return new Response(JSON.stringify(errors), { status: 400 })
  }

  const customer = serverState.customers.find(c => c.email === body.email)

  if (!customer) {
    return new Response(JSON.stringify({error: 'Customer does not exist'}), { status: 400 })
  }

  serverState.customers.push(customer)
  serverState.currentCustomerId = customer.id

  return new Response(JSON.stringify(customer))
}