# useState hook

the `useState` hook is a set on framework level. it is not part of the core package. so `rlx-store/react` and `rlx-store/svelte` and `rlx-store/[framework]` will each bring their own implementation

`useState` will listen to store-changes and trigger an component-update each time its value changes. in it's most basic version it will resolve the whole store and trigger a re-render whenever the store updates:

```javascript
const myState = store.useState() // resolves whole store
```

`useState` allows an callback argument to resolve (and listen) to only a fraction of the state:

```javascript
const myState = store.useState(state => ({
  foo: state.foo,
  bar: state.bar,
}))
```

## global useState

the framework also exports an global version of use state to create selector functions:

```javascript
import {useState} from 'rlx-store/react'

const useTodosByFilter = () => useState(
  [store1, store2], 
  (state1, state2) => state1.todos.filter(todo => todo.filter === store2.filter),
)
```

in fact the `store.useState` is just syntax shuggar for the global version