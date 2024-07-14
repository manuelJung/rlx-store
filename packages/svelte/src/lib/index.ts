import { onMount, onDestroy } from "svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import createStoreFactory from "@rlx/core";
import type { Store, StoreConfig, ActionsType } from "@rlx/types";

const createStore = createStoreFactory({
  injectFramework: (store:any) => ({
    ...store,
    useState: (selector:Function=(n:any)=>n, equalityFn?:Function) => {
      const state = writable(selector(store.getState()));
      let cache = equalityFn ? equalityFn(store.getState()) : []
      const unsubscribe = store.subscribe((newState:any) => {
        if(equalityFn) {
          const newCache = equalityFn(newState)
          if(newCache.every((v:any, i:any) => v === cache[i])) return
          cache = newCache
          state.set(selector(newState))
        }
        else {
          const newResult = selector(newState)
          if(shallowEqual(state, newResult)) return
          state.set(newResult)
        }
      })

      onDestroy(unsubscribe)

      return state
    },
  }),
  onMount: onMount,
  onDestroy: onDestroy,
}) as any as <
  Name extends string,
  State extends Record<string, unknown> | any,
  Action extends ActionsType<State>,
>(
  cfg: StoreConfig<Name, State, Action>
) => Store<State, Action> & {
  useState: <SState=State>(
    selector?: (state: State) => SState,
    equalityFn?: (state:State) => any[],
  ) => Writable<SState>
};

export default createStore;

function shallowEqual(a:any, b:any) {
  if(a === b) return true
  if(typeof a !== 'object' || typeof b !== 'object') return false
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if(aKeys.length !== bKeys.length) return false
  if(Array.isArray(a)) return false
  return aKeys.every(key => a[key] === b[key])
}