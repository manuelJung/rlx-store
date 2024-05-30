

interface StoreConfig<State> {
  state: State
  actions: () => Record<string, () => ReturnType<typeof createAsync>>
  // fn: () => ReturnType<typeof createAsync>
}

interface Store<State> {
  getState: () => State
}

type CreateStore = <State>(config:StoreConfig<State>) => Store<State>

const createStore = null as any as CreateStore

// const createAsync = null as any as CreateAsync
function createAsync <State>(config:{
  fn: (state:State) => State
}) {
  return null
}

const store = createStore({
  state: {
    foo: 'bar' as const
  },
  actions: () => ({
    fn: () => createAsync<typeof this>({
      fn: state => state
    })
  })
})

store.getState().foo
