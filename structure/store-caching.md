# Store Caching

unlike useState the store has the ability to be reused by other components by setting a key prop:

```javascript
import {createStore} from 'rlx-store/react'

export default function counterStore () {
  const store = createStore({
    name: 'counter',
    key: '',
    state: 0,
    actions: {
      increment: (n=1) => set => set(state => state+n),
      decrement: (n=1) => set => set(state => state-n),
    }
  })

  return store
}
```

That way each call to `counterStore()` will return the same instance everytime no matter from which component the function is called from. Also the lifecycle of the store will change: the store does not unmount when the component unmounts and there are other components that use this store. the store will unmount when the very last component that uses this store will unmount!

To prevent the store from unmounting even if the last component unmounts we can set the `persist` flag:

```javascript
import {createStore} from 'rlx-store/react'

export default function counterStore () {
  const store = createStore({
    name: 'counter',
    key: '',
    persist: true, // store will keep its state forever
    state: 0,
    actions: {
      increment: (n=1) => set => set(state => state+n),
      decrement: (n=1) => set => set(state => state-n),
    }
  })

  return store
}
```

The key is a extemly powerful mechanism, because it can be used for caching. the key can also be set by args. that way powerful patterns can emerge:


```javascript
import {createStore} from 'rlx-store/react'

/**
 * the first component that calls this function can set the initial state. all other components
 * will use this state when they use the same key
 */
export default function counterStore (key:string, initialState=0) {
  const store = createStore({
    name: 'counter',
    key: key,
    state: initialState,
    actions: {
      increment: (n=1) => set => set(state => state+n),
      decrement: (n=1) => set => set(state => state-n),
    }
  })

  return store
}
```