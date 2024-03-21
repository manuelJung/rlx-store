import { simpleStore, compositeStore } from "./utils/setup";
import { StringMeta, NumberMeta, notAny, expectNever } from "./utils/utils";

// SIMPLESTORE: single simpleStore-target
simpleStore.addRule({
  id: "",
  target: "simpleStore/simpleString",
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});
// COMPOSITESTORE: single compositeStore-target
compositeStore.addRule({
  id: "",
  target: "compositeStore/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});

// SIMPLESTORE: single compositeStore-target
simpleStore.addRule({
  id: "",
  target: "compositeStore/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});
// COMPOSITESTORE: single simpleStore-target
compositeStore.addRule({
  id: "",
  target: "simpleStore/simpleString",
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});

// SIMPLESTORE: multiple simpleStore-targets
simpleStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta | NumberMeta = args.action.meta;
    // @ts-expect-error: if meta is not correctly inferred as union, which is needed to check
    const error: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});
// COMPOSITESTORE: multiple compositeStore-targets
compositeStore.addRule({
  id: "",
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta | NumberMeta = args.action.meta;
    // @ts-expect-error: if meta is not correctly inferred as union, which is needed to check
    const error: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});

// SIMPLESTORE: multiple mixed-targets
simpleStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta | NumberMeta = args.action.meta;
    // @ts-expect-error: if meta is not correctly inferred as union, which is needed to check
    const error: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});
// COMPOSITESTORE: multiple mixed-targets
compositeStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta | NumberMeta = args.action.meta;
    // @ts-expect-error: if meta is not correctly inferred as union, which is needed to check
    const error: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});

// SIMPLESTORE: multiple compositeStore-targets
simpleStore.addRule({
  id: "",
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta | NumberMeta = args.action.meta;
    // @ts-expect-error: if meta is not correctly inferred as union, which is needed to check
    const error: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});
// COMPOSITESTORE: multiple simpleStore-targets
compositeStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta | NumberMeta = args.action.meta;
    // @ts-expect-error: if meta is not correctly inferred as union, which is needed to check
    const error: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
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
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});
// COMPOSITESTORE: single compositeStore-target
compositeStore.addRule({
  id: "",
  target: "/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: as meta is correctly inferred
    const meta: StringMeta = args.action.meta;
    // ts-expects-no-error: as meta is an array & push only exists on arrays
    args.action.meta.push;
    // @ts-expect-error: if meta has more than one argument
    args.action.meta[1];
    // ts-expects-no-error: as meta should not be of type any
    notAny(args.action.meta);
    // @ts-expect-error: as meta should not be of type never
    expectNever(args.action.meta);
  },
});
