import serverState from '../../../server-state.js';

/** @type {import('./$types').RequestHandler} */
export async function fallback (params) {
  return new Response(JSON.stringify({
    hits: serverState.products
  }))
}