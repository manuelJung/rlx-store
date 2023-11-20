import { simpleStore, compositeStore } from "./utils/setup";
import { expectNever, notAny } from "./utils/utils";

// SIMPLESTORE: single simpleStore-target
simpleStore.addRule({
  target: "simpleStore/simpleString",
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: string = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred
    const error: number = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});
simpleStore.addRule({
  target: "simpleStore/simpleNumber",
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: number = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred
    const error: string = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});

// COMPOSITESTORE: single compositeStore-target
compositeStore.addRule({
  target: "compositeStore/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: string = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred
    const error: number = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});
compositeStore.addRule({
  target: "compositeStore/compositeNumber",
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: number = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred
    const error: string = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});

// SIMPLESTORE: single compositeStore-target
simpleStore.addRule({
  target: "compositeStore/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: string = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred
    const error: number = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});
simpleStore.addRule({
  target: "compositeStore/compositeNumber",
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: number = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred
    const error: string = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});

// COMPOSITESTORE: single simpleStore-target
compositeStore.addRule({
  target: "simpleStore/simpleString",
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: string = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred
    const error: number = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});
compositeStore.addRule({
  target: "simpleStore/simpleNumber",
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: number = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred
    const error: string = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});

// SIMPLESTORE: multiple simpleStore-targets
simpleStore.addRule({
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: string | number = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred because its an union
    const error: number = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});
// COMPOSITESTORE: multiple compositeStore-targets
compositeStore.addRule({
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: string | number = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred because its an union
    const error: number = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});

// SIMPLESTORE: multiple mixed-targets
simpleStore.addRule({
  target: ["simpleStore/simpleString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: string | number = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred because its an union
    const error: number = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});
// COMPOSITESTORE: multiple mixed-targets
compositeStore.addRule({
  target: ["simpleStore/simpleString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: string | number = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred because its an union
    const error: number = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});

// SIMPLESTORE: multiple compositeStore-targets
simpleStore.addRule({
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: string | number = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred because its an union
    const error: number = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});
// COMPOSITESTORE: multiple simpleStore-targets
compositeStore.addRule({
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as payload is correctly inferred
    const payload: string | number = args.action.payload;
    // @ts-expect-error: as payload is not correctly inferred because its an union
    const error: number = args.action.payload;
    // ts-expects-no-error: as payload should not be of type any
    notAny(args.action.payload);
    // @ts-expect-error: as payload should not be of type never
    expectNever(args.action.payload);
  },
});
