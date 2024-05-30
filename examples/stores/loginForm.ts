const createStore:any = null
const useSelector:any = null

function createSalutationStore () {
  const store = createStore({
    name: 'salutation',
    key: '',
    state: {
      data: [] as {name:string, id:string}[],
      isFetching: true,
    },
    actions: {
      fetch: () => ({
        fetcher: fetchSalutations,
      })
    }
  })

  return store
}

export default function createLoginForm () {
  const salutations = createSalutationStore()
  const store = createStore({
    name: 'login-form',
    key: '',
    state: {
      email: '',
      password: '',
      salutationId: '',
      isFetching: false,
      fetchError: null as null | string,
      emailError: null as null | string,
      passwordError: null as null | string,
      status: null as null | 'SUCCESS' | 'VALIDATION_ERROR',
    },
    actions: {
      setEmail: (email:string) => () => ({email}),
      setPassword: (password:string) => () => ({password}),
      setSalutationId: (salutationId:string) => () => ({salutationId}),
      send: () => ({
        mappings: {data:'status'},
        fetcher: state => login(state.email, state.password),
        mapResponse: response => ({
          emailError: response.emailError,
          passwordError: response.passwordError,
          status: response.status,
        })
      })
    }
  })

  const selector = useSelector([salutations, store], (salutations, store) => ({
    fetching: salutations.isFetching,
    data: salutations.data.map(row => ({
      ...row,
      selected: store.salutationId === row.id
    }))
  }))
}

async function login(email, password) {}

async function fetchSalutations () {}