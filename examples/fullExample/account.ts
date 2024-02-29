const createStore:any = null
const createTrackingStore:any = null

type User = {
  name: string
  channel: 'b2b' | 'b2c'
}

type LoginErrorCode = 'INVALID_CREDENTIALS' | '500'

export default function createAccountStore () {
  const trackingStore = createTrackingStore()
  const store = createStore({
    name: 'account',
    state: {
      user: null as null | User,
      setupFin: false,
      isLoggingIn: false,
      loginError: null as null | LoginErrorCode,
    },
    actions: {
      initialFetch: () => ({
        triggerOnMount: true,
        fields: null,
        fetcher: fetchUser,
        mapResponse: user => ({ user, setupFin: true }),
      }),
      login: (username:string, password:string) => ({
        fields: {data:'user', isFetching:'isLoggingIn', fetchError:'loginError'},
        fetcher: () => login(username, password),
      }),
      logout: () => ({
        fields: null,
        fetcher: logout,
        mapResponse: () => ({ user: null }),
      }),
    }
  })

  store.addRule({
    id: 'tracking',
    target: ['/login', '/logout'],
    consequence: ({action}) => {
      if (action === 'login') {
        trackingStore.push('login')
      } else {
        trackingStore.push('logout')
      }
    }
  })

  return store
}

async function fetchUser ():Promise<null|User> {
  return null
}

async function login (username:string, password:string):Promise<User> {
  return {name:'', channel: 'b2b'}
}

async function logout ():Promise<null> {
  return null
}