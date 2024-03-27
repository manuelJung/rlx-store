import { simpleStore, compositeStore } from "./utils/setup";
import { expectNever, notAny } from "./utils/utils";

// SIMPLESTORE: single simpleStore-target
simpleStore.addRule({
  id: "",
  target: "simpleStore/simpleString",
  consequence: (args) => {
    // ts-expects-no-error: as type is correctly inferred
    args.action.type === "simpleStore/simpleString";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "simpleStore/simpleObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});
// COMPOSITESTORE: single compositeStore-target
compositeStore.addRule({
  id: "",
  target: "compositeStore/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: as type is correctly inferred
    args.action.type === "compositeStore/compositeString";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "compositeStore/compositeObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});

// SIMPLESTORE: single compositeStore-target
simpleStore.addRule({
  id: "",
  target: "compositeStore/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: as type is correctly inferred
    args.action.type === "compositeStore/compositeString";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "simpleStore/simpleObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});
// COMPOSITESTORE: single simpleStore-target
compositeStore.addRule({
  id: "",
  target: "simpleStore/simpleString",
  consequence: (args) => {
    // ts-expects-no-error: as type is correctly inferred
    args.action.type === "simpleStore/simpleString";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    aargs.action.type === "compositeStore/compositeObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});

// SIMPLESTORE: multiple simpleStore-targets
simpleStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as type for multiple targets is correctly inferred
    args.action.type === "simpleStore/simpleString";
    args.action.type === "simpleStore/simpleNumber";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "simpleStore/simpleObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});
// COMPOSITESTORE: multiple compositeStore-targets
compositeStore.addRule({
  id: "",
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as type for multiple targets is correctly inferred
    args.action.type === "compositeStore/compositeString";
    args.action.type === "compositeStore/compositeNumber";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "compositeStore/compositeObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});

// SIMPLESTORE: multiple mixed-targets
simpleStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as type for multiple targets is correctly inferred
    args.action.type === "simpleStore/simpleString";
    args.action.type === "compositeStore/compositeNumber";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "simpleStore/simpleObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});
// COMPOSITESTORE: multiple mixed-targets
compositeStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as type for multiple targets is correctly inferred
    args.action.type === "simpleStore/simpleString";
    args.action.type === "compositeStore/compositeNumber";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "compositeStore/compositeObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});

// SIMPLESTORE: multiple compositeStore-targets
simpleStore.addRule({
  id: "",
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as type for multiple targets is correctly inferred
    args.action.type === "compositeStore/compositeString";
    args.action.type === "compositeStore/compositeNumber";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "simpleStore/simpleObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});
// COMPOSITESTORE: multiple simpleStore-targets
compositeStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as type for multiple targets is correctly inferred
    args.action.type === "simpleStore/simpleString";
    args.action.type === "simpleStore/simpleNumber";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "compositeStore/compositeObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
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
    // ts-expects-no-error: as type is correctly inferred
    args.action.type === "/simpleString";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "simpleStore/simpleObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});
// COMPOSITESTORE: single compositeStore-target
compositeStore.addRule({
  id: "",
  target: "/compositeString",
  consequence: (args) => {
    // ts-expects-no-error: as type is correctly inferred
    args.action.type === "/compositeString";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "compositeStore/compositeObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});

// SIMPLESTORE: multiple simpleStore-targets
simpleStore.addRule({
  id: "",
  target: ["/simpleString", "/simpleNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as type for multiple targets is correctly inferred
    args.action.type === "/simpleString";
    args.action.type === "/simpleNumber";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "/simpleObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});
// COMPOSITESTORE: multiple compositeStore-targets
compositeStore.addRule({
  id: "",
  target: ["/compositeString", "/compositeNumber"],
  consequence: (args) => {
    // ts-expects-no-error: as type for multiple targets is correctly inferred
    args.action.type === "/compositeString";
    args.action.type === "/compositeNumber";
    // @ts-expect-error: as type should not be of type of a rule, which is not part of target
    args.action.type === "/compositeObject";
    // @ts-expect-error: as type should not be empty
    args.action.type === "";
    // @ts-expect-error: as type should not be invalid
    args.action.type === "invalid";
    // ts-expects-no-error: as type should not be of type any
    notAny(args.action.type);
    // @ts-expect-error: as type should not be of type never
    expectNever(args.action.type);
  },
});

// @TODO should not allow empty array for target
