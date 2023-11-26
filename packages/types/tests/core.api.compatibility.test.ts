import { KeysMatch } from "./utils/utils";
import {
  Store as TypesStore,
  ConsequenceArgs as TypesConsequenceArgs,
  StoreConfig as TypesStoreConfig,
} from "../src";
import {
  Store as CoreStore,
  ConsequenceArgs as CoreConsequenceArgs,
  StoreConfig as CoreStoreConfig,
} from "../../core/src/types";

type StoreMatches = KeysMatch<TypesStore<any, any>, CoreStore> &
  KeysMatch<CoreStore, TypesStore<any, any>>;
// ts-expects-no-error: as both types have the same keys
const storeMatches: StoreMatches = true;

type StoreConfigMatches = KeysMatch<
  TypesStoreConfig<any, any, any>,
  CoreStoreConfig
> &
  KeysMatch<CoreStoreConfig, TypesStoreConfig<any, any, any>>;
// ts-expects-no-error: as both types have the same keys
const storeConfigMatches: StoreConfigMatches = true;

type ConsequenceArgsMatches = KeysMatch<
  TypesConsequenceArgs<any, any, any>,
  CoreConsequenceArgs
> &
  KeysMatch<CoreConsequenceArgs, TypesConsequenceArgs<any, any, any>>;
// ts-expects-no-error: as both types have the same keys
const consequenceArgsMatches: ConsequenceArgsMatches = true;
