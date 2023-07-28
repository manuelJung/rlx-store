# RLX-Store

```javascript
import {createStore} from 'rlx-store/react'

export default function counterStore () {
  const store = createStore({
    name: 'counter',
    state: 0,
    actions: {
      increment: (n=1) => state => state+n,
      decrement: (n=1) => state => state-n,
      // increment: (n=1) => set => set(state => state+n),
      // decrement: (n=1) => set => set(state => state-n),
    }
  })

  return store
}
```

A store is an object that lives inside the frameworks (react, svelte, ...) lifecycles. It behaves similar to react's useState hook:
- It will be created during the first render of the component
- It will keep it's state during subsequent renders
- It will be destroyed when the component unmounts

The returned store is an object that has methods to READ or UPDATE the inner state:

```javascript
ReturnType<typeof counterStore> = {
  name: 'counter',
  increment: (n=1) => void,
  decrement: (n=1) => void,
  // whenever state changes useState will trigger a re-render (aka observable)
  // will be injected on framework level (rlx-store/react, rlx-store/svelte, ...)
  useState: () => number,
  // pub-sub api low-level api
  subscribe: (cb:()=>void) => () => void,
  // low level sync state getter
  getState: () => number,
}
```

Besides this basic setup a store has serveral abilities to tweak the behaviour:
- [re-use same store instance across serveral components](./store-caching.md)
- data flow management with rules
- store-composition
- [granual control for useState hook](./use-state.md)
