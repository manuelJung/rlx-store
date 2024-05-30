import serverState, { type Customer } from '../../../server-state.js';
import Schema from 'validate'

/** @type {import('./$types').RequestHandler} */
export async function POST (params) {

  const customer = serverState.customers.find(c => c.email === serverState.currentCustomerId) ?? null

  return new Response(JSON.stringify(customer))
}