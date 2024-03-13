import createStore from '@rlx/svelte'
import {produce} from 'immer'

type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function createTodoStore () {
  const store = createStore({
    name: 'todos',
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
    }
  })

  return store
}