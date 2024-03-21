import createStore from '@rlx/svelte'

type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function createTodoStore () {
  const store = createStore({
    name: 'todos',
    persist: true,
    state: {
      data: [] as Todo[]
    },
    actions: {
      add: (text: string) => state => ({
        data: [
          {
            id: state.data.length,
            text,
            completed: false
          },
          ...state.data,
        ]
      }),
      remove: (id: number) => state => ({
        data: state.data.filter(todo => todo.id !== id)
      }),
      toggle: (id: number) => state => ({
        data: state.data.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed
            }
          }
          return todo
        })
      })
    }
  })

  store.addRule({
    // @ts-expect-error
    id: 'log-add',
    target: 'todos/add',
    consequence: ({action}) => console.log(action)
  })

  store.addRule({
    // @ts-expect-error
    id: 'log-remove',
    target: 'todos/remove',
    consequence: ({action}) => console.log(action)
  })

  return store
}

declare global {
  interface RlxStores {
    todos: ReturnType<typeof createTodoStore>
  }
}