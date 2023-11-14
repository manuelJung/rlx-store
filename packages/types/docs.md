# Enable Type Inference

### Creating a Store
A store can be created using the `createStore` function. This method is straightforward and is used for creating stores with a predefined set of actions and state. This is the intended normal use and you do not need to configure anything at this point to benefit from the type inference (except the item `Extending the Global Interface` must be implemented.  

```javascript
export const store = createStore({
  name: "store",
  actions: {
    stringFn: (s: string) => () => s,
    numberFn: (n: number) => () => n,
    // ... other actions
  },
  state: {
    number: 0,
    string: "",
    // ... other state properties
  },
});
```

### Creating a Composite Store
A composite store is created using a higher-order function that returns a createStore function. This method is useful when you need a templated store that can be configured with additional actions and state properties.

```javascript
const useCompositeStore = <Name, State, Actions>(
  config: StoreConfig<Name, State, Actions>
) => {
  return createStore({
    name: config.name,
    actions: {
      compositeString: (s: string) => () => s,
      compositeNumber: (n: number) => () => n,
      ...config.actions,
    },
    state: {
      compositeNumber: 0,
      compositeString: "",
      ...config.state,
    },
  });
};

export const compositeStore = useCompositeStore({
  name: "compositeStore",
  actions: {
    // ... additional or overriding actions
  },
  state: {
    // ... additional or overriding state properties
  },
});
```

The type parameters `<Name, State, Actions>` are crucial for the function to correctly infer the types. These parameters can be named differently, but it's important to use them as generic in the function as well in as parameters in the `StoreConfig`. 
`StoreConfig` is a type exported from the library. To clarify, StoreConfig requires three type parameters to correctly create the return type of createStore. In the case of the CompositeStore (and the higher-order function), the configuration can be extended with additional properties, which is why these three parameters are necessary. This ensures TypeScript can correctly infer the ReturnType of the store.

### Extending the Global Interface
To integrate your store with the RlxStores system, you must extend the global RlxStores interface. This allows the library to correctly type-check and infer types across your application.

```typescript
declare global {
  interface RlxStores {
    store: typeof store;
    compositeStore: typeof compositeStore;
    // ... other stores
  }
}
```
Extend the RlxStores interface with the key-value pairs where the key is the store's name and the value is the store's type. This step is crucial for enabling the library's type inference and ensuring type safety across your application, otherwise you will have not type-support. 

### Type Inference in Action
The library is designed to leverage TypeScript's advanced type inference capabilities, ensuring that you write less code while maintaining type safety. Here, we'll explore some use cases demonstrating this feature.

@TBD
