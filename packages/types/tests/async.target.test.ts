import { asyncStore, compositeStore, simpleStore } from "./utils/setup";

// @ts-expect-error for a async target without postfix
asyncStore.addRule({ id: "", target: "asyncStore/asyncAction" });

// ts-expects-no-error: for a /request postfix
asyncStore.addRule({ id: "", target: "asyncStore/asyncAction/request" });

// ts-expects-no-error: for a /success postfix
asyncStore.addRule({ id: "", target: "asyncStore/asyncAction/success" });

// ts-expects-no-error: for a /failure postfix
asyncStore.addRule({ id: "", target: "asyncStore/asyncAction/failure" });

// ts-expects-no-error: for a valid sync action in a store with async actions
asyncStore.addRule({ id: "", target: "asyncStore/nonAsyncAction" });

// @ts-expect-error: for a async action with /request postfix
asyncStore.addRule({ id: "", target: "asyncStore/syncAction/request" });

// @ts-expect-error: for a async action with /success postfix
asyncStore.addRule({ id: "", target: "asyncStore/syncAction/success" });

// @ts-expect-error: for a async action with /failure postfix
asyncStore.addRule({ id: "", target: "asyncStore/syncAction/failure" });

// ts-expects-no-error: for two valid targets one with postfix one without
asyncStore.addRule({
  id: "",
  target: ["asyncStore/asyncAction/failure", "asyncStore/nonAsyncAction"],
});

// ts-expects-no-error: for two valid targets both with postfix
asyncStore.addRule({
  id: "",
  target: ["asyncStore/asyncAction/failure", "asyncStore/asyncAction/request"],
});

/* 
  OWN TARGET RULES 
*/
// @ts-expect-error for a async target without postfix
asyncStore.addRule({ id: "", target: "/asyncAction" });

// ts-expects-no-error: for a /request postfix
asyncStore.addRule({ id: "", target: "/asyncAction/request" });

// ts-expects-no-error: for a /success postfix
asyncStore.addRule({ id: "", target: "/asyncAction/success" });

// ts-expects-no-error: for a /failure postfix
asyncStore.addRule({ id: "", target: "/asyncAction/failure" });

// ts-expects-no-error: for a valid sync action in a store with async actions
asyncStore.addRule({ id: "", target: "/nonAsyncAction" });

// @ts-expect-error: for a async action with /request postfix
asyncStore.addRule({ id: "", target: "/syncAction/request" });

// @ts-expect-error: for a async action with /success postfix
asyncStore.addRule({ id: "", target: "/syncAction/success" });

// @ts-expect-error: for a async action with /failure postfix
asyncStore.addRule({ id: "", target: "/syncAction/failure" });
