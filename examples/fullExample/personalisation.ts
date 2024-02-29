const createStore:any = null

type Config<T> = {
  selector: string
  strategy?: 'BLUR' | 'NO_CACHE'
  initialData?: T
  mapResponse?: <X>(data:X) => T
}

export type PersonalisationStore = ReturnType<typeof createPersonalisationStore>


export default function createPersonalisationStore <T>(config:Config<T>) {
  const store = createStore({
    name: 'personalisation',
    key: config.selector,
    state: {
      isFetching: false,
      fetchError: null,
      data: null as null | T,
      config: config,
    },
    actions: {
      fetch: () => ({
        triggerOnMount: true,
        fetcher: state => fetchPersonalisation(state.config),
      }),
    }
  })

  return store
}

async function fetchPersonalisation <T>(config:Config<T>) {
  return ''
}