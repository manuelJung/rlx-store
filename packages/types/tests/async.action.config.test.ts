import { createStore } from "./utils/utils";

createStore({
  name: "asyncStore",
  actions: {
    // ts-expects-no-error: if returntype of fetcher is void, when state.data does not exist
    asyncAction: (s: string) => ({
      fetcher: async (state) => {},
    }),
  },
  state: {
    someKey: 0,
  },
});

createStore({
  name: "asyncStore",
  actions: {
    // @ts-expect-error: if returntype of fetcher is not void, when state.data does not exist
    asyncAction: (s: string) => ({
      fetcher: async (state) => ({
        someKey: 0,
      }),
    }),
  },
  state: {
    someKey: 0,
  },
});

createStore({
  name: "asyncStore",
  actions: {
    // @ts-expect-error: if returntype of fetcher is not same as state[data] (if state.data exists)
    asyncAction: (s: string) => ({
      fetcher: async (state) => "",
    }),
  },
  state: {
    data: null,
    someKey: 0,
  },
});

createStore({
  name: "asyncStore",
  actions: {
    // @ts-expect-error: if mappings.data uses key, which not exists in state
    asyncAction: (s: string) => ({
      fetcher: async (state) => null,
      mappings: {
        data: "random key",
      },
    }),
  },
  state: {
    data: null,
    someKey: null,
  },
});

createStore({
  name: "asyncStore",
  actions: {
    // @ts-expect-error: if mappings.isFetching uses key, which not exists in state
    asyncAction: (s: string) => ({
      fetcher: async (state) => null,
      mappings: {
        isFetching: "random key",
      },
    }),
  },
  state: {
    data: null,
    someKey: null,
  },
});

createStore({
  name: "asyncStore",
  actions: {
    // @ts-expect-error: if mappings.fetchError uses key, which not exists in state
    asyncAction: (s: string) => ({
      fetcher: async (state) => null,
      mappings: {
        fetchError: "random key",
      },
    }),
  },
  state: {
    data: null,
    someKey: null,
  },
});
