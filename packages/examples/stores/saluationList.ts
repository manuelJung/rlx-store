import createFetchStore from "../composit/createFetchStore"

export type Salutation = {
  id: string
  label: string
}

declare global {
  interface RlxStore {
    salutationStore: ReturnType<typeof getSalutationStore>
  }
}

export default function getSalutationStore () {
  const store = createFetchStore({
    name: 'salutationList',
    fetchFn: fetchSalutations,
  })

  return store
}

async function fetchSalutations ():Promise<{data:Salutation[]}> {
  return {
    data: []
  }
}