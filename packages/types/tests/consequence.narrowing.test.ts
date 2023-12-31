import { simpleStore, compositeStore } from "./utils/setup";
import { StringMeta, NumberMeta, notAny, expectNever } from "./utils/utils";

// SIMPLESTORE: multiple simpleStore-targets
simpleStore.addRule({
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
  consequence: (args) => {
    if (args.action.type === "simpleStore/simpleString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: StringMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "simpleStore/simpleString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: string = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "simpleStore/simpleNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: NumberMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "simpleStore/simpleNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: number = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
  },
});
// COMPOSITESTORE: multiple compositeStore-targets
compositeStore.addRule({
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    if (args.action.type === "compositeStore/compositeString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: StringMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "compositeStore/compositeString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: string = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "compositeStore/compositeNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: NumberMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "compositeStore/compositeNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: number = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
  },
});

// SIMPLESTORE: multiple mixed-targets
simpleStore.addRule({
  target: ["simpleStore/simpleString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    if (args.action.type === "simpleStore/simpleString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: StringMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "simpleStore/simpleString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: string = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "compositeStore/compositeNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: NumberMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "compositeStore/compositeNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: number = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
  },
});
// COMPOSITESTORE: multiple mixed-targets
compositeStore.addRule({
  target: ["simpleStore/simpleString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    if (args.action.type === "simpleStore/simpleString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: StringMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "simpleStore/simpleString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: string = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "compositeStore/compositeNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: NumberMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "compositeStore/compositeNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: number = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
  },
});

// SIMPLESTORE: multiple compositeStore-targets
simpleStore.addRule({
  target: ["compositeStore/compositeString", "compositeStore/compositeNumber"],
  consequence: (args) => {
    if (args.action.type === "compositeStore/compositeString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: StringMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "compositeStore/compositeString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: string = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "compositeStore/compositeNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: NumberMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "compositeStore/compositeNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: number = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
  },
});
// COMPOSITESTORE: multiple simpleStore-targets
compositeStore.addRule({
  target: ["simpleStore/simpleString", "simpleStore/simpleNumber"],
  consequence: (args) => {
    if (args.action.type === "simpleStore/simpleString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: StringMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "simpleStore/simpleString") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const string: string = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "simpleStore/simpleNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: NumberMeta = args.action.meta;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
    if (args.action.type === "simpleStore/simpleNumber") {
      // ts-expects-no-error: as with type-narrowing the type should be inferred
      const number: number = args.action.payload;
      // ts-expects-no-error: as payload should not be of type any
      notAny(args.action.payload);
      // @ts-expect-error: as payload should not be of type never
      expectNever(args.action.payload);
    }
  },
});
