# Type-Save

A store is completly type-save. Every action will result in a redux-like action:

```javascript
createStore({
  name: 'counter',
  state: { value: 0 },
  actions: {
    increment: (n=1) => state => ({ value: state.value+n })
  }
})

type Action = {
  type: 'counter/increment'
  meta: [number] // list of all arguments
  payload: number // the first argument
}
```

This action can then be used by effects:

```javascript
store.addRule({
  name: 'log',
  target: '/increment', // or 'counter/increment'
  // action will be infered
  effect: action => console.log(action)
})
```

when a target starts with a `/` it can only refer to current store. otherwise it can refer to any store. but to allow this, the store types must be populated globally:

```javascript
export default function counterStore () {
  const store = createStore(/* config */)
  return store
}

declare global {
  interface RlxStores {
    'counter': ReturnType<typeof counterStore>
  }
}
```

That way we can pull out all action-types so the effect types can access them