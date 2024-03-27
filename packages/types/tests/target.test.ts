import { compositeStore, simpleStore } from "./utils/setup";

// ts-expects-no-error: for a valid simpleStore-target for a simpleStore
simpleStore.addRule({ id: "", target: "simpleStore/simpleString" });
// ts-expects-no-error: for a valid compositeStore-target for a compositeStore
compositeStore.addRule({ id: "", target: "compositeStore/compositeString" });

// ts-expects-no-error: for a valid compositeStore-target for a simpleStore
simpleStore.addRule({ id: "", target: "compositeStore/compositeString" });
// ts-expects-no-error: for a valid simpleStore-target for a compositeStore
compositeStore.addRule({ id: "", target: "simpleStore/simpleString" });

// ts-expects-no-error: for two valid simpleStore-targets for a simpleStore
simpleStore.addRule({
  id: "",
  target: ["simpleStore/simpleNumber", "simpleStore/simpleString"],
});
// ts-expects-no-error: for two valid compositeStore-targets for a compositeStore
compositeStore.addRule({
  id: "",
  target: ["compositeStore/compositeNumber", "compositeStore/compositeString"],
});

// ts-expects-no-error: for two valid compositeStore-targets for a simpleStore
simpleStore.addRule({
  id: "",
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
});
// ts-expects-no-error: for two valid simpleStore-targets for a compositeStore
simpleStore.addRule({
  id: "",
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
});

// ts-expects-no-error: for valid mixed-targets for a simpleStore
simpleStore.addRule({
  id: "",
  target: ["compositeStore/compositeString", "simpleStore/simpleString"],
});
// ts-expects-no-error: for valid mixed-targets for a compositeStore
compositeStore.addRule({
  id: "",
  target: ["compositeStore/compositeString", "simpleStore/simpleString"],
});

//@ts-expect-error: for an empty target for a simpleStore
simpleStore.addRule({ id: "", target: "" });
//@ts-expect-error: for an empty target for a compositeStore
compositeStore.addRule({ id: "", target: "" });

//@ts-expect-error: for an empty target inside array for a simpleStore
simpleStore.addRule({ id: "", target: [""] });
//@ts-expect-error: for an empty target inside array for a compositeStore
compositeStore.addRule({ id: "", target: [""] });

//@ts-expect-error: for two empty targets for a simpleStore
simpleStore.addRule({ id: "", target: ["", ""] });
//@ts-expect-error: for two empty targets for a compositeStore
compositeStore.addRule({ id: "", target: ["", ""] });

//@ts-expect-error: for a valid target and an empty one for a simpleStore
simpleStore.addRule({ id: "", target: ["simpleStore/simpleString", ""] });
compositeStore.addRule({
  id: "",
  //@ts-expect-error: for a valid target and an empty one for a compositeStore
  target: ["compositeStore/compositeString", ""],
});

simpleStore.addRule({
  id: "",
  //@ts-expect-error: for a valid target and an invalid one for a simpleStore
  target: ["simpleStore/simpleString", "simpleStore/invalid"],
});
compositeStore.addRule({
  id: "",
  //@ts-expect-error: for a valid target and an invalid one for a compositeStore
  target: ["compositeStore/compositeString", "compositeStore/invalid"],
});

//@ts-expect-error: for no target propperty for a simpleStore
simpleStore.addRule({ id: "" });
//@ts-expect-error: for no target propperty for a compositeStore
compositeStore.addRule({ id: "" });

//@ts-expect-error: for no id propperty for a simpleStore
simpleStore.addRule({ target: "simpleStore/simpleEmpty" });
//@ts-expect-error: for no id propperty for a compositeStore
compositeStore.addRule({ target: "compositeStore/compositeEmpty" });

/* 
  OWN TARGET
*/

// ts-expects-no-error: for multiple own-targets
simpleStore.addRule({
  id: "",
  target: ["/simpleString", "/simpleEmpty"],
});
// ts-expects-no-error: for a valid simpleStore-target for a simpleStore
simpleStore.addRule({ id: "", target: "/simpleString" });
// ts-expects-no-error: for a valid compositeStore-target for a compositeStore
compositeStore.addRule({ id: "", target: "/compositeString" });

/* 
  MIXED TARGETS
*/
// ts-expects-no-error: for a combination of a own-target and a ruletarget
simpleStore.addRule({
  id: "",
  target: ["/simpleString", "compositeStore/compositeString"],
});

simpleStore.addRule({
  id: "",
  // @ts-expect-error: for multiple own-actions with targets from different, not own store
  target: ["/simpleString", "/compositeString"],
});
