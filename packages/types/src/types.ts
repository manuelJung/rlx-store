declare global {
  interface RlxStores {}
}
type StoreKeys = keyof RlxStores;

export type StoreConfig<
  TName extends String,
  TState extends Record<string, unknown>,
  TActions extends ActionsType<TState>
> = {
  name: TName;
  state: HasAsyncAction<TActions> extends true
    ? TState & { data?: any; isFetching?: any; fetchError?: any }
    : TState;
  actions: TActions;
  key?: string;
  persist?: boolean;
};

type HasAsyncAction<TActions> = {
  [K in keyof TActions]: TActions[K] extends AsyncAction<any> ? true : never;
}[keyof TActions] extends never
  ? false
  : true;

type SyncAction<TState> = (
  ...payload: any
) => (state: TState) => Partial<TState>;
type AsyncAction<TState> = (...payload: any) => AsyncActionConfig<TState>;

export type ActionsType<TState> = Record<
  string,
  SyncAction<TState> | AsyncAction<TState>
>;

type DataKeyType<TState> = "data" extends keyof TState ? TState["data"] : void;

export type AsyncActionConfig<TState> = {
  mappings?: {
    data?: keyof TState;
    isFetching?: keyof TState;
    fetchError?: keyof TState;
  };
  fetcher: (state: TState) => Promise<DataKeyType<TState>>;
  concurrency?: "DEFAULT" | "FIRST" | "LAST" | "SWITCH";
  throttle?: number;
  debounce?: number;
  mapResponse?: (
    response: DataKeyType<TState>,
    state: TState
  ) => Partial<TState>;
  optimisticData?: (state: TState) => DataKeyType<TState>;
  triggerOnMount?: boolean;
};

export type Store<TState, TActions extends Record<string, unknown>> = {
  name: string;
  key?: string;
  getState: () => TState;
  subscribe: (cb: (state: TState) => void) => () => void;
  addRule: <
    TTarget extends
      | RuleTarget
      | SlashRuleTarget<TActions>
      | (RuleTarget | SlashRuleTarget<TActions>)[]
  >(
    rule: Rule<TTarget, TState, TActions>
  ) => void;
  dispatchWrapper?: ((fn: any) => void) | undefined;
  actions: TActions;
};

type RuleTarget = {
  [Key in StoreKeys]: {
    [ActionKey in ActionKeys<
      RlxStores[Key]
    >]: RlxStores[Key]["actions"][ActionKey] extends SyncAction<any>
      ? `${Key}/${ActionKey}`
      : RlxStores[Key]["actions"][ActionKey] extends AsyncAction<any>
      ?
          | `${Key}/${ActionKey}/request`
          | `${Key}/${ActionKey}/success`
          | `${Key}/${ActionKey}/failure`
      : never;
  }[ActionKeys<RlxStores[Key]>];
}[StoreKeys];

type SlashRuleTarget<TActions> = {
  [K in keyof TActions]: TActions[K] extends SyncAction<any>
    ? `/${Extract<K, string>}`
    : TActions[K] extends AsyncAction<any>
    ?
        | `/${Extract<K, string>}/request`
        | `/${Extract<K, string>}/success`
        | `/${Extract<K, string>}/failure`
    : never;
}[keyof TActions];

type ActionKeys<TStore> = TStore extends { actions: infer TActions }
  ? TActions extends Record<string, (...args: any[]) => void>
    ? keyof TActions
    : never
  : never;

export type Rule<
  TTarget extends
    | RuleTarget
    | SlashRuleTarget<TActions>
    | (RuleTarget | SlashRuleTarget<TActions>)[],
  TState,
  TActions extends Record<string, unknown>
> = {
  id: string;
  target: TTarget;
  consequence?: (args: ConsequenceArgs<TTarget, TState, TActions>) => void;
  condition?: (args: ConditionArgs<TState, TActions>) => Boolean;
  weight?: number;
  position?: "BEFORE" | "INSTEAD" | "AFTER";
  output?: string | string[];
  concurrency?: "DEFAULT" | "FIRST" | "LAST" | "ONCE" | "SWITCH";
  concurrencyFilter?: (action: TActions) => string;
  onExecute?: "REMOVE_RULE" | "RECREATE_RULE";
  throttle?: number;
  debounce?: number;
  delay?: number;
};

export type ConditionArgs<TState, TActions extends Record<string, unknown>> = {
  action: TActions;
  store: Store<TState, TActions>;
  getStore: (name: string, key?: string) => Store<TState, TActions> | null;
  getStores: () => RlxStores;
};

type RemoveAsyncPostfix<T extends string> = T extends
  | `${infer Base}/request`
  | `${infer Base}/success`
  | `${infer Base}/failure`
  ? Base
  : T;

type StoreActions<TStoreName extends StoreKeys> =
  RlxStores[TStoreName] extends {
    actions: infer TAction;
  }
    ? TAction extends Record<string, (...args: any) => any>
      ? TAction
      : never
    : never;

type ActionNames<TStoreName extends StoreKeys> = keyof StoreActions<TStoreName>;

type ActionFunction<
  TStoreName extends StoreKeys,
  TActionname extends ActionNames<TStoreName>
> = StoreActions<TStoreName>[TActionname];

export type ConsequenceArgs<
  TTarget extends
    | RuleTarget
    | SlashRuleTarget<TActions>
    | (RuleTarget | SlashRuleTarget<TActions>)[],
  TState,
  TActions extends Record<string, unknown>
> = TTarget extends RuleTarget
  ? RuleTargetArgs<TTarget, TState, TActions>
  : TTarget extends SlashRuleTarget<TActions>
  ? SlashRuleTargetArgs<TTarget, TState, TActions>
  : TTarget extends (RuleTarget | SlashRuleTarget<TActions>)[]
  ? ArrayRuleTargetArgs<TTarget, TState, TActions>
  : never;

type SlashActionArgs<
  TTarget extends SlashRuleTarget<TActions>,
  TActions extends Record<string, unknown>
> = {
  type: TTarget;
  payload: Parameters<
    // @ts-expect-error
    TActions[ExtractActionName<RemoveAsyncPostfix<TTarget>>]
  >[0];
  meta: ExtractArgumentsType<
    TActions[ExtractActionName<RemoveAsyncPostfix<TTarget>>]
  >;
  skipRule?: string | string[];
};

type RuleTargetArgs<
  TTarget extends RuleTarget,
  TState,
  TActions extends Record<string, unknown>
> = CommonRuleArgs<TState, TActions> & {
  action: ActionArgs<TTarget>;
};

type SlashRuleTargetArgs<
  TTarget extends SlashRuleTarget<TActions>,
  TState,
  TActions extends Record<string, unknown>
> = CommonRuleArgs<TState, TActions> & {
  action: SlashActionArgs<TTarget, TActions>;
};

type ArrayRuleTargetArgs<
  TTargets extends (RuleTarget | SlashRuleTarget<TActions>)[],
  TState,
  TActions extends Record<string, unknown>
> = CommonRuleArgs<TState, TActions> & {
  action: {
    [TTarget in TTargets[number]]: TTarget extends SlashRuleTarget<TActions>
      ? SlashActionArgs<TTarget, TActions>
      : ActionArgs<Extract<TTarget, RuleTarget>>;
  }[TTargets[number]];
};

export type CommonRuleArgs<TState, TActions extends Record<string, unknown>> = {
  action: TActions;
  store: Store<TState, TActions>;
  wasCanceled: () => boolean;
  effect: (fn: (...args: any[]) => void) => void;
  getStore: (name: string, key?: string) => Store<TState, TActions> | null;
  getStores: (name: string) => Store<TState, TActions>[];
};

type ActionArgs<TTarget extends RuleTarget> = {
  type: TTarget;
  payload: ExtractFirstArgumentType<RemoveAsyncPostfix<TTarget>>;
  meta: ExtractArgumentsType<
    ActionFunction<
      ExtractStoreName<RemoveAsyncPostfix<TTarget>>,
      ExtractActionName<RemoveAsyncPostfix<TTarget>>
    >
  >;
  skipRule?: string | string[];
};

type ExtractFirstArgumentType<TTarget extends string> =
  TTarget extends `${infer TStoreName}/${infer TActionName}`
    ? TStoreName extends StoreKeys
      ? TActionName extends ActionNames<TStoreName>
        ? Parameters<ActionFunction<TStoreName, TActionName>>[0]
        : never
      : never
    : never;

type ExtractStoreName<TTarget extends string> =
  TTarget extends `${infer StoreName}/${string}`
    ? StoreName extends keyof RlxStores
      ? StoreName
      : never
    : never;

type ExtractActionName<TTarget extends string> =
  TTarget extends `${string}/${infer ActionName}` ? ActionName : never;

type ExtractArgumentsType<TActionFn> = TActionFn extends (
  ...args: infer TArgs
) => any
  ? TArgs
  : never;
