## React `createStore` Proposals

### Goal

A React implementation of the `createStore` API, which is used to create a store object and can be used to store a state. It should be possible to update components based on state changes of the stores.

#### Patterns I tried 
- Proxy Pattern
- Mediator Pattern
- Observer Pattern (used by the createStore API)

### Sticking with the Observer Pattern

We stick with the Observer Pattern, due to the fact that it is used by the createStore API and it is a well known pattern.
One pattern we thought of, the Proxy pattern, is hard to implement without reinventing the wheel because we are not manipulating the object directly, but by actions or events.

### useState or useReducer
- No complex state
- No complex state transitions (handled by core)
- No state dependencies 
- Thus no need for a reducer and dispatching actions
- Thus performance of useState is better than useReducer [[1]](https://www.frontendmag.com/tutorials/usereducer-vs-usestate/)

### Adding functionality by intended injectFramework API

With the injectFramework API provided by `rlx/core` it's possible to add functionality to the `createStore` API. This is done by passing a function to the `injectFramework` API, which receivies and returns a store object. This store object can be manipulated by the function and thus add functionality to the `createStore` API.

This would mean we could create a `createStore` API for React, which is based on the `createStore` API of `rlx/core` and adds functionality to it.

```ts
const createStore = createStoreFactory({
  injectFramework: store => ({
    ...store,
    useStateValue: () => {
      const [state, setState] = React.useState(store.getState)
      React.useEffect(() => store.subscribe(setState), [])
      return state
    }
  }),
  getInstanceId: (createId) => React.useState(createId)[0],
  onMount: cb => { React.useEffect(cb, []) },
  onDestroy: cb => { React.useEffect(() => cb, []) },
})

export default createStore;
```

#### Pros

- Easy to implement
- Easy to use
- No need to reinvent the wheel

#### Cons
- Not the React way

### Adding a `useStore` hook

The `useStore` hook is a hook that returns the store object and the corresponding `state` object. It is used to access the store and the state object in a component.

```jsx

function MyComponent() {
   const [state, store] = useStore({name: 'name-store', actions: {}, state: 'Alex'});
   return <div>
        <p>Hello, {state}!</p>
    </div>
}
```

Due to the fact that the `createStore` function always returns the same store object, we can use the `useStore` hook in multiple components and they will always share the same store, but will be updated based on state changes due to their own `setState` functions, which are passed to the subscriptions of the store.

#### Remarks from discussion

Selectors should be implemented to prevent components that only listen to part of the state to be rerendered when the state changes. This should be done by a technique that is similiar to depency arrays in React. So that the developer is responsible for providing the correct information to the library.
(Refer to ReReSelect for API)

- Maybe we can use useReducer to trigger specific updates in specific components

#### Pros
- Easy to implement
- The way React works

#### Cons
- Hard to test properly