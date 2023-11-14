import { compositeStore, simpleStore } from "./utils/setup";

// ts-expects-no-error: for a valid simpleStore-target for a simpleStore
simpleStore.addRule({ target: "simpleStore/simpleString" });
// ts-expects-no-error: for a valid compositeStore-target for a compositeStore
compositeStore.addRule({ target: "compositeStore/compositeString" });

// ts-expects-no-error: for a valid compositeStore-target for a simpleStore
simpleStore.addRule({ target: "compositeStore/compositeString" });
// ts-expects-no-error: for a valid simpleStore-target for a compositeStore
compositeStore.addRule({ target: "simpleStore/simpleString" });


// ts-expects-no-error: for two valid simpleStore-targets for a simpleStore
simpleStore.addRule({ target: ["simpleStore/simpleNumber", "simpleStore/simpleString"] });
// ts-expects-no-error: for two valid compositeStore-targets for a compositeStore
compositeStore.addRule({ target: ["compositeStore/compositeNumber", "compositeStore/compositeString"] });

// ts-expects-no-error: for two valid compositeStore-targets for a simpleStore
simpleStore.addRule({ target: ["compositeStore/compositeString", "compositeStore/compositeNumber"] });
// ts-expects-no-error: for two valid simpleStore-targets for a compositeStore
simpleStore.addRule({ target: ["simpleStore/simpleString", "simpleStore/simpleNumber"] });

// ts-expects-no-error: for valid mixed-targets for a simpleStore
simpleStore.addRule({ target: ["compositeStore/compositeString", "simpleStore/simpleString"] });
// ts-expects-no-error: for valid mixed-targets for a compositeStore
compositeStore.addRule({ target: ["compositeStore/compositeString", "simpleStore/simpleString"] });


//@ts-expect-error: for an empty target for a simpleStore
simpleStore.addRule({ target: "" });
//@ts-expect-error: for an empty target for a compositeStore
compositeStore.addRule({ target: "" });

//@ts-expect-error: for an empty target inside array for a simpleStore
simpleStore.addRule({ target: [""] });
//@ts-expect-error: for an empty target inside array for a compositeStore
compositeStore.addRule({ target: [""] });

//@ts-expect-error: for two empty targets for a simpleStore
simpleStore.addRule({ target: ["", ""] });
//@ts-expect-error: for two empty targets for a compositeStore
compositeStore.addRule({ target: ["", ""] });

//@ts-expect-error: for a valid target and an empty one for a simpleStore
simpleStore.addRule({ target: ["simpleStore/simpleString", ""] });
//@ts-expect-error: for a valid target and an empty one for a compositeStore
compositeStore.addRule({ target: ["compositeStore/compositeString", ""] });

//@ts-expect-error: for a valid target and an invalid one for a simpleStore
simpleStore.addRule({ target: ["simpleStore/simpleString", 'simpleStore/invalid'] });
//@ts-expect-error: for a valid target and an invalid one for a compositeStore
compositeStore.addRule({ target: ["compositeStore/compositeString", "compositeStore/invalid"] });

//@ts-expect-error: for no target propperty for a simpleStore
simpleStore.addRule({});
//@ts-expect-error: for no target propperty for a compositeStore
compositeStore.addRule({});