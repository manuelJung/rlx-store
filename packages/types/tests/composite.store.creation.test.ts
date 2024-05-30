import { ActionsType, StoreConfig } from "../src";
import { createStore } from "./utils/utils";

const createCompositeStore = <
  Name extends string,
  State extends Record<string, unknown>,
  Actions extends ActionsType<State>
>(
  config: StoreConfig<Name, State, Actions>
) => {
  const store = createStore({
    name: config.name,
    actions: {
      sampleAction: () => (state) => state,
    },
    state: {},
  });

  store.addRule({ target: "/sampleAction", id: "" });
  //@ts-expect-error: as a non existing action is not valid
  store.addRule({ target: "/notAnAction", id: "" });
  //@ts-expect-error: as / is not an valid operator
  store.addRule({ target: "/", id: "" });

  return store;
};
