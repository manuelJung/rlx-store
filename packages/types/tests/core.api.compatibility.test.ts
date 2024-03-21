import { KeysAreEqual } from "./utils/utils";
import {
  Store as TypesStore,
  CommonRuleArgs as TypesConsequenceArgs,
  StoreConfig as TypesStoreConfig,
  Rule as TypesRule,
  AsyncActionConfig as TypesAsyncActionConfig,
  ConditionArgs as TypesConditionArgs,
} from "../src/types";
import {
  Store as CoreStore,
  ConsequenceArgs as CoreConsequenceArgs,
  StoreConfig as CoreStoreConfig,
  Rule as CoreRule,
  AsyncActionConfig as CoreAsyncActionConfig,
  ConditionArgs as CoreConditionArgs,
} from "../../core/src/types";

type StoreMatches = KeysAreEqual<TypesStore<any, any>, CoreStore>;
// ts-expects-no-error: as both types have the same keys
const storeMatches: StoreMatches = true;

type StoreConfigMatches = KeysAreEqual<
  TypesStoreConfig<any, any, any>,
  CoreStoreConfig
>;
// ts-expects-no-error: as both types have the same keys
const storeConfigMatches: StoreConfigMatches = true;

type ConsequenceArgsMatches = KeysAreEqual<
  TypesConsequenceArgs<any, any>,
  CoreConsequenceArgs
>;
// ts-expects-no-error: as both types have the same keys
const consequenceArgsMatches: ConsequenceArgsMatches = true;

type RuleMatches = KeysAreEqual<TypesRule<any, any, any>, CoreRule>;
// ts-expects-no-error: as both types have the same keys
const ruleMatches: RuleMatches = true;

type AsyncActionConfigMatches = KeysAreEqual<
  TypesAsyncActionConfig<any>,
  CoreAsyncActionConfig
>;
// ts-expects-no-error: as both types have the same keys
const asyncActionConfigMatches: AsyncActionConfigMatches = true;

type ConditionArgsMatches = KeysAreEqual<
  TypesConditionArgs<any, any>,
  CoreConditionArgs
>;
// ts-expects-no-error: as both types have the same keys
const conditionArgsMatches: ConditionArgsMatches = true;
