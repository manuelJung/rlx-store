import { onMount, onDestroy } from "svelte";
import { writable } from "svelte/store";
import createStoreFactory from "@rlx/core";
import { Store, StoreConfig, ActionsType } from "@rlx/types";

export default createStoreFactory({
  injectFramework: (store) => ({
    ...store,
    useState: () => {
      const state = writable(store.getState());
      store.subscribe((newState) => state.set(newState));
      return state;
    },
  }),
  onMount: onMount,
  onDestroy: onDestroy,
}) as any as <
  Name extends string,
  State extends Record<string, unknown>,
  Action extends ActionsType<State>
>(
  cfg: StoreConfig<Name, State, Action>
) => Store<State, Action>;

export { Store, StoreConfig, ActionsType };
