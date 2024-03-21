import { createStore } from "./utils/utils";

createStore({
  name: "asyncStore",
  actions: {
    another: (s: string) => (state) => ({
      simpleString: state.simpleString + s,
    }),
    asyncAction: (s: string) => ({
      fetcher: async (state) => ({}),
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
      fetcher: async (state) => ({}),
    }),
  },
  //@ts-expect-error: async action inside action requires data field in state
  state: {
    someKey: null,
  },
});
