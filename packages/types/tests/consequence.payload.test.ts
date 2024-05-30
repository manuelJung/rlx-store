import { simpleStore, compositeStore } from "./utils/setup";
import { expectNever, notAny } from "./utils/utils";

// SIMPLESTORE: single simpleStore-target
simpleStore.addRule({
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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
  id: "",
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

/* 
  SLASH TARGET
*/
// SIMPLESTORE: single simpleStore-target
simpleStore.addRule({
  id: "",
  target: "/simpleString",
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
  id: "",
  target: "/simpleNumber",
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
  id: "",
  target: "/compositeString",
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
  id: "",
  target: "/compositeNumber",
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
  id: "",
  target: ["/simpleString", "/simpleNumber"],
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
  id: "",
  target: ["/compositeString", "/compositeNumber"],
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

/* 
  MIXED TARGETS
*/

// SIMPLESTORE: multiple mixed-targets
simpleStore.addRule({
  id: "",
  target: ["/simpleString", "compositeStore/compositeNumber"],
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
  id: "",
  target: ["simpleStore/simpleString", "/compositeNumber"],
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
