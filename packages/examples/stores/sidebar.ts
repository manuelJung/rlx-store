import createStore from "../react/createStore";

declare global {
  interface RlxStore {
    sidebar: ReturnType<typeof getSidebarStore>
  }
}

export default function getSidebarStore () {
  const store = createStore({
    name: 'sidebar',
    state: {
      open: false
    },
    actions: {
      toggle: () => state => ({open:!state.open})
    }
  })

  return store
}