import { ActionsType, Store, StoreConfig } from "../../src/index";

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
export type KeysAreEqual<A, B> = [keyof A] extends [keyof B]
  ? [keyof B] extends [keyof A]
    ? true
    : false
  : false;
export type IsTrue<T> = T extends true ? true : false;

type NotAny<T> = T extends IsAny<T> ? never : T;
type IsAny<T> = unknown extends T ? (T extends {} ? T : never) : never;

const createStoreFactory = () => {
  function createStore<
    Name extends string,
    State extends Record<string, unknown> | any,
    Action extends ActionsType<State>
  >(cfg: StoreConfig<Name, State, Action>) {
    return {} as Store<State, Action>;
  }
  return createStore;
};

export const createStore = createStoreFactory();
