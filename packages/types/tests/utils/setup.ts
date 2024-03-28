import { ActionsType, StoreConfig } from "../../src";
import { createStore } from "./utils";

declare global {
  interface RlxStores {
    simpleStore: typeof simpleStore;
    compositeStore: typeof compositeStore;
    asyncStore: typeof asyncStore;
  }
}

export const simpleStore = createStore({
  name: "simpleStore",
  actions: {
    simpleString: (s: string) => (state) => ({
      simpleString: state.simpleString + s,
    }),
    simpleNumber: (n: number) => (state) => ({
      simpleNumber: state.simpleNumber + n,
    }),
    simpleEmpty: () => (state) => state,
    simpleObject: (o: { simpleKeyString: string }) => (state) => ({
      simpleObject: { simpleKeyString: o.simpleKeyString },
    }),
    simpleMultipleArgs: (s: string, n: number) => (state) => ({
      simpleNumber: n,
    }),
  },
  state: {
    simpleNumber: 0,
    simpleString: "",
    simpleObject: { simpleKeyString: "" },
  },
});

const createCompositeStore = <
  Name extends string,
  State extends Record<string, unknown>,
  Actions extends ActionsType<State>
>(
  config: StoreConfig<Name, State, Actions>
) => {
  const store = createStore({
    name: config.name,
    actions: {
      compositeString: (s: string) => (state) => ({
        ...state,
        compositeString: state.compositeString,
      }),
      compositeNumber: (n: number) => (state) => ({
        ...state,
        compositeNumber: n,
      }),
      compositeEmpty: () => (state) => state,
      compositeObject: (o: { compositeKeyString: string }) => (state) => state,
      compositeMultipleArgs: (s: string, n: number) => (state) => state,
      ...(config.actions as ActionsType<State>),
    },
    state: {
      compositeNumber: 0,
      compositeString: "",
      compositeObject: { compositeKeyString: "" },
      ...config.state,
    },
  });

  store.addRule({
    id: "",
    target: "/compositeObject",
    consequence: (args) => args.action,
  });

  return store;
};

export const compositeStore = createCompositeStore({
  name: "compositeStore",
  actions: {
    extendedCompositeString: (s: string) => (state) => state,
    extendedCompositeMultipleArgs: (s: string, n: number) => (state) => state,
  },
  state: {
    extendedCompositeState: null,
  },
});

export const asyncStore = createStore({
  name: "asyncStore",
  actions: {
    nonAsyncAction: (s: string) => (state) => ({
      data: (state.data = s),
    }),
    asyncAction: (s: string) => ({
      fetcher: async (state) => "",
    }),
  },
  state: {
    data: "",
  },
});
