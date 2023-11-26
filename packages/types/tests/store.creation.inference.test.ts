import { ActionsType, StoreConfig } from "../src";
import {
  CompositeStoreState,
  SimpleStoreState,
  createStore,
  expectNever,
  notAny,
} from "./utils/utils";

export const simpleStore = createStore({
  name: "simpleStore",
  actions: {
    testAction: (s: string) => (state) => {
      // ts-expects-no-error: if state is inferred correctly
      const test: SimpleStoreState = state;
      // ts-expects-no-error: as state should not be of type any
      notAny(state);
      // @ts-expect-error: as state should not be of type never
      expectNever(state);
      return state;
    },
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
  return createStore({
    name: "compositeStore",
    actions: {
      testAction: (s: string) => (state) => {
        // HINT: this is a known limitation
        // ts-expects-no-error: if state is inferred correctly
        const test: Omit<CompositeStoreState, "extendedCompositeState"> = state;
        // @ts-expect-error: as state should not be of type never
        expectNever(state);
        return state;
      },
    },
    state: {
      compositeNumber: 0,
      compositeString: "",
      compositeObject: { compositeKeyString: "" },
      ...config.state,
    },
  });
};

export const compositeStore = createCompositeStore({
  name: "compositeStore",
  actions: {
    testAction: (s: string) => (state) => {
      // HINT: this is a known limitation
      // ts-expects-no-error: if state is inferred correctly
      const test: {
        extendedCompositeState: null;
      } = state;
      // @ts-expect-error: as state should not be of type never
      expectNever(state);
      return state;
    },
  },
  state: {
    extendedCompositeState: null,
  },
});
