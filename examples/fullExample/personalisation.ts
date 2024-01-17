const createStore:any = null

export default function createPersonalisationStore (selector:string) {
  const store = createStore({
    name: 'personalisation',
    key: selector,
    state: {
      isFetching: false,
      fetchError: null,
      data: null,
    }
  })

  return store
}