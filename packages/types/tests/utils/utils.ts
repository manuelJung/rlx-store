import { ActionsType, CreateStore, StoreConfig } from "../../src/index";

export type SimpleStoreState = {
  simpleNumber: number;
  simpleString: string;
  simpleObject: {
    simpleKeyString: string;
  };
};

export type CompositeStoreState = {
  compositeNumber: number;
  compositeString: string;
  compositeObject: {
    compositeKeyString: string;
  };
  extendedCompositeState: null;
};

export type StringMeta = [s: string];
export type NumberMeta = [n: number];
export function notAny<T>(n: NotAny<T>) {}
export function expectNever(n: never) {}

type NotAny<T> = T extends IsAny<T> ? never : T;
type IsAny<T> = unknown extends T ? (T extends {} ? T : never) : never;

const createStoreFactory = () => {
  function createStore<
    Name extends string,
    State extends Record<string, unknown>,
    Action extends ActionsType<State>
  >(cfg: StoreConfig<Name, State, Action>) {
    return {} as CreateStore<State, Action>;
  }
  return createStore;
};

export const createStore = createStoreFactory();
