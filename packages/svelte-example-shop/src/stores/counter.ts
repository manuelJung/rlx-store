import createStore from "@rlx/svelte"

export default function createCounterStore () {
  const store = createStore({
    name: 'counter',
    persist: true,
    state: {
      count: 0
    },
    actions: {
      increment: () => state => ({
        count: state.count + 1
      }),
      decrement: () => state => ({
        count: state.count - 1
      })
    }
  })

  return store
}

declare global {
  interface RlxStores {
    counter: ReturnType<typeof createCounterStore>
  }
}