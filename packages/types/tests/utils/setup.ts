import { ActionsType, StoreConfig } from "../../src";
import { createStore } from "./utils";

declare global {
  interface RlxStores {
    simpleStore: typeof simpleStore;
    compositeStore: typeof compositeStore;
  }
}

export const simpleStore = createStore({
  name: "simpleStore",
  actions: {
    simpleString: (s: string) => (state) => state.simpleString + "another",
    simpleNumber: (n: number) => () => n,
    simpleEmpty: () => () => {},
    simpleObject: (o: { simpleKeyString: string }) => () => o,
    simpleMultipleArgs: (s: string, n: number) => () => s + n,
  },
  state: {
    simpleNumber: 0,
    simpleString: "",
    simpleObject: { simpleKeyString: "" },
  },
});

const useCompositeStore = <
  Name extends string,
  State extends Record<string, unknown>,
  Actions extends ActionsType<State>
>(
  config: StoreConfig<Name, State, Actions>
) => {
  return createStore({
    name: "compositeStore",
    actions: {
      compositeString: (s: string) => (state) => state,
      compositeNumber: (n: number) => () => n,
      compositeEmpty: () => () => {},
      compositeObject: (o: { compositeKeyString: string }) => () => o,
      compositeMultipleArgs: (s: string, n: number) => () => s + n,
      ...config.actions,
    },
    state: {
      compositeNumber: 0,
      compositeString: "",
      compositeObject: { compositeKeyString: "" },
      ...config.state,
    },
  });
};

export const compositeStore = useCompositeStore({
  name: "compositeStore",
  actions: {
    extendedCompositeString: (s: string) => (state) => state,
    extendedCompositeMultipleArgs: (s: string, n: number) => () => s + n,
  },
  state: {
    extendedCompositeState: null,
  },
});
