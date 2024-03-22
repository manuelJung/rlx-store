import { createStore } from "./utils/utils";

createStore({
  name: "asyncStore",
  actions: {
    another: (s: string) => (state) => ({
      simpleString: state.simpleString + s,
    }),
    asyncAction: (s: string) => ({
      fetcher: async (state) => state.data,
      mapResponse: (response, state) => state,
      mappings: {},
    }),
  },
  state: {
    data: null,
    simpleString: "",
  },
});

createStore({
  name: "asyncStore",
  actions: {
    asyncAction: (s: string) => ({
      fetcher: async (state) => null,
      mappings: {
        data: "someKey",
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
    // @ts-expect-error: if returntype of fetcher is not same as state[data] (if state.data exists)
    asyncAction: (s: string) => ({
      fetcher: async (state) => "",
      mappings: {
        data: "someKey",
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
    // @ts-expect-error: if mappings.data uses key, which not exists in state
    asyncAction: (s: string) => ({
      fetcher: async (state) => null,
      mappings: {
        data: 'random key',
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
        isFetching: 'random key'
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
        fetchError: 'random key'
      },
    }),
  },
  state: {
    data: null,
    someKey: null,
  },
});
