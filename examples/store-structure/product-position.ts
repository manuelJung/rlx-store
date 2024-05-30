const createStore:any = null

type Position = {
  sku: string
  containerID: string
  position: string
  listName: string
}

export default function productPositionStore () {
  const store = createStore({
    name: 'productPosition',
    key: '',
    state: {
      sku: '',
      containerID: '',
      position: '',
      listName: '',
    },
    actions: {
      set: (position:Position) => () => position
    }
  })

  return store
}