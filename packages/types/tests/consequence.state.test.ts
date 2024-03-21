import { simpleStore, compositeStore } from "./utils/setup";
import {
  CompositeStoreState,
  SimpleStoreState,
  notAny,
  expectNever,
} from "./utils/utils";

// SIMPLESTORE: single simpleStore-target
simpleStore.addRule({
  id: "",
  target: "simpleStore/simpleString",
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: SimpleStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});
// COMPOSITESTORE: single compositeStore-target
compositeStore.addRule({
  id: "",
  target: "compositeStore/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: CompositeStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});

// SIMPLESTORE: single compositeStore-target
simpleStore.addRule({
  id: "",
  target: "compositeStore/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: SimpleStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});
// COMPOSITESTORE: single simpleStore-target
compositeStore.addRule({
  id: "",
  target: "simpleStore/simpleString",
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: CompositeStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});

// SIMPLESTORE: multiple simpleStore-targets
simpleStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: SimpleStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});
// COMPOSITESTORE: multiple compositeStore-targets
compositeStore.addRule({
  id: "",
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: CompositeStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});

// SIMPLESTORE: multiple mixed-targets
simpleStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: SimpleStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});
// COMPOSITESTORE: multiple mixed-targets
compositeStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: CompositeStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});

// SIMPLESTORE: multiple compositeStore-targets
simpleStore.addRule({
  id: "",
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: SimpleStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});
// COMPOSITESTORE: multiple simpleStore-targets
compositeStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: CompositeStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});

/* 
  OWN TARGET
*/
// SIMPLESTORE: single simpleStore-target
simpleStore.addRule({
  id: "",
  target: "/simpleString",
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: SimpleStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});
// COMPOSITESTORE: single compositeStore-target
compositeStore.addRule({
  id: "",
  target: "/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: if state is inferred correctly
    const state: CompositeStoreState = args.store.getState();
    // ts-expects-no-error: as state should not be of type any
    notAny(args.store.getState());
    // @ts-expect-error: as state should not be of type never
    expectNever(args.store.getState());
  },
});
