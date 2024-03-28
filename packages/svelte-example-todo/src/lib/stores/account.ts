import createStore from "@rlx/svelte";
import { Customer } from "../../server-state";

declare global {
  interface RlxStores {
    account: ReturnType<typeof createAccountStore>
  }
}

export default function createAccountStore () {
  const store = createStore({
    name: 'account',
    persist: true,
    state: {
      user: null as Customer | null,
      initialFetched: false,
      fetchError: null as string | null,
      isLoggingIn: false,
    },
    actions: {
      /** comment */
      initialFetch: () => ({
        triggerOnMount: true,
        fetcher: () => fetch('/api/account'),
        mapResponse: r => ({ user: r, initialFetched: true }),
      }),
      login: (email: string, password: string) => ({
        fetcher: () => fetch('/api/account/login', { email, password }),
        concurrency: 'FIRST',
        mappings: { data: 'user', isFetching: 'isLoggingIn'}
      }),
      logout: () => ({
        fetcher: () => fetch('/api/account/logout').then(r => r.json()),
        concurrency: 'FIRST',
        optimisticData: () => ({ user: null }),
      }),
      register: (email: string, password: string) => ({
        fetcher: () => fetch('/api/account/register', { email, password }),
        concurrency: 'FIRST',
        mappings: { data: 'user' }
      }),
      updateUser: (user:{name:string}) => ({
        fetcher: () => fetch('/api/account/update', user),
        optimisticData: (state) => ({ user: {...state.user, ...user} }),
        concurrency: 'LAST',
        mappings: { data: 'user' }
      }),
    }
  })

  store.addRule({
    id: 'log-user',
    target: 'account/login/request',
    consequence: ({action, store}) => store.actions.initialFetch()
  })

  return store
}

function fetch(url: string, body:any=null) {
  return window.fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json())
}