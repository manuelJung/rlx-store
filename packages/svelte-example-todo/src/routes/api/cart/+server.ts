import serverState, { type Customer } from '../../../server-state.js';
import Schema from 'validate'

/** @type {import('./$types').RequestHandler} */
export async function POST (params) {

  const cart = serverState.cart

  return new Response(JSON.stringify(cart))
}