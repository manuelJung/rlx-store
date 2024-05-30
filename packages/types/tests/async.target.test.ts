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
  SLASH TARGET RULES 
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

// @ts-expect-error: for a non async action with /request postfix
asyncStore.addRule({ id: "", target: "/syncAction/request" });

// @ts-expect-error: for a non async action with /success postfix
asyncStore.addRule({ id: "", target: "/syncAction/success" });

// @ts-expect-error: for a non async action with /failure postfix
asyncStore.addRule({ id: "", target: "/syncAction/failure" });

// ts-expects-no-error: for multiple async actions
asyncStore.addRule({
  id: "",
  target: ["/asyncAction/request", "/asyncAction/success"],
});

/* 
  MIXED TARGETS
*/

// ts-expects-no-error: for a combination of a slash-targets and a target
asyncStore.addRule({
  id: "",
  target: ["/asyncAction/request", "compositeStore/compositeEmpty"],
});
asyncStore.addRule({
  id: "",
  // @ts-expect-error: for multiple slash-targets not of own store 
  target: ["/asyncAction/request", "/simpleString"],
});
