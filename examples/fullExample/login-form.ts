const createStore:any = null
const produce:any = null

const initialState = {
  submitting: false,
  success: false,
  globalError: null,
  fields: {
    email: '',
    password: '',
  },
  errors: {
    email: null as null | string,
    password: null as null | string,
  }
}

type ErrorFn = (status:number, ctx?:any) => void
type State = typeof initialState

export default function createLoginFormStore () {
  const store = createStore({
    name: 'login-form',
    state: initialState,
    actions: {
      set: <Field extends keyof State['fields']>(
        field:Field, 
        value:State['fields'][Field],
      ) => produce(state => {
        state.fields[field] = value
      }),
      submit: () => ({
        fetcher: sendForm,
        fields: {isFetching:'submitting', data:'success'},
        onError: error => produce(state => {
          if(error.status === 403) {
            for(const field of error.fields) state.errors[field.name] = field.value
          }
          else {
            state.globalError = true
          }
        })
      })
    }
  })

  return store
}

async function sendForm (state:State, error:ErrorFn) {
  throw error(403, {fields: [{name:'password', value:'VALIDATION_FAILED'}]})
}