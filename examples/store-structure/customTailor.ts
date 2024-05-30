import productDetailStore from "./productDetail"

const createStore:any = null

type Options = {
  brink: string[]
}

type Filters = {
  brink: null | string
}

export default function customTailorStore () {
  const detailStore = productDetailStore()
  const store = createStore({
    name: 'customTailor',
    key: detailStore,
    state: {
      options: {
        brink: []
      } as Options,
      filters: {
        brink: null
      } as Filters,
    },
    actions: {
      setFilters: (filters:Filters) => ({
        lense: 'filters',
        updater: () => filters
      })
    }
  })

  return store
}