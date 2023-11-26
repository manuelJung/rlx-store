// import { ActionsType, StoreConfig } from "../src";
// import { createStore } from "../tests/utils/utils";

// declare global {
//   interface RlxStores {
//     counterStore: typeof counterStore;
//     infoStore: typeof infoStore;
//   }
// }

// export const counterStore = createStore({
//   name: "counterStore",
//   actions: {
//     increase: () => (state) => state.counter++,
//   },
//   state: {
//     counter: 0,
//   },
// });

// export const infoStore = createStore({
//   name: "infoStore",
//   actions: {
//     setInfo: (s: string) => (state) => state.info,
//   },
//   state: {
//     info: "default",
//   },
// });

// declare global {
//   interface RlxStores {
//     compositeStore: typeof compositeStore;
//   }
// }

// const createCompositeStore = <
//   Name extends string,
//   State extends Record<string, unknown>,
//   Actions extends ActionsType<State>
// >(
//   config: StoreConfig<Name, State, Actions>
// ) => {
//   return createStore({
//     name: "compositeStore",
//     actions: {
//       compositeNumber: (n: number) => (state) => state,
//       ...(config.actions as ActionsType<State>),
//     },
//     state: {
//       compositeNumber: 0,
//       ...config.state,
//     },
//   });
// };

// export const compositeStore = createCompositeStore({
//   name: "compositeStore",
//   actions: {
//     extendedCompositeString: () => (state) => state,
//   },
//   state: {
//     extendedCompositeState: null,
//   },
// });

// compositeStore.addRule({
//   target: [
//     "compositeStore/compositeNumber",
//     "compositeStore/extendedCompositeString",
//   ],
//   consequence: (args) => {
//     args.action;
//   },
// });
