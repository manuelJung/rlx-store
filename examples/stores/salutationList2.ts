const createStore:any = null

export type Salutation = {
  id: string
  label: string
}

export default function createSalutationStore() {
  const store = createStore({
    name: 'salutation-list',
    state: {
      isFetching: false,
      fetchError: null as null | string,
      data: [] as Salutation[],
    },
    actions: {
      fetch: () => ({
        triggerOnMount: true,
        fetcher: fetchSalutionList
      })
    }
  })

  store.addRule({
    name: '/invalidateData',
    target: 'account/logout',
    output: '/fetch',
    consequence: ({store}) => store.fetch()
  })

  return {
    ...store,
    useSalutation: (id:string) => store.useState(
      state => state.data.find(o => o.id === id),
      state => [state.data, id],
    )
  }
}

async function fetchSalutionList ():Promise<Salutation[]> {
  return []
}
