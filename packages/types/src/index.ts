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
  state: TState;
  actions: TActions;
  key?: string;
  persist?: boolean;
};

export type ActionsType<State> = Record<
  string,
  (...payload: any) => (state: State) => Partial<State>
>;

export type Store<TState, TActions extends Record<string, unknown>> = {
  getState: () => TState;
  actions: TActions;
  addRule: <TTarget extends RuleTarget | RuleTarget[]>(
    rule: Rule<TTarget, TState, TActions>
  ) => void;
  key?: string;
  subscribe: (cb: (state: TState) => void) => () => void;
  dispatchWrapper?: ((fn: any) => void) | undefined;
};

type RuleTarget = {
  [Key in StoreKeys]: ActionKeys<RlxStores[Key]> extends infer TAction
    ? TAction extends string
      ? `${Key}/${TAction}`
      : never
    : never;
}[StoreKeys];

type ActionKeys<TStore> = TStore extends { actions: infer TActions }
  ? TActions extends Record<string, (...args: any[]) => void>
    ? keyof TActions
    : never
  : never;

type Rule<
  TTarget extends RuleTarget | RuleTarget[],
  TState,
  TActions extends Record<string, unknown>
> = {
  target:
    | TTarget
    | keyof {
        [K in keyof TActions as `/${Extract<K, string>}`]: TActions[K];
      };
  consequence?: (args: ConsequenceArgs<TTarget, TState, TActions>) => void;
};

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

type ConsequenceArgs<
  TTarget extends RuleTarget | RuleTarget[],
  TState,
  TActions extends Record<string, unknown>
> = TTarget extends RuleTarget[]
  ? RuleTargetArrayArgs<TTarget, TState, TActions>
  : TTarget extends RuleTarget
  ? SingleRuleTargetArgs<TTarget, TState, TActions>
  : never;

type RuleTargetArrayArgs<
  TTargets extends RuleTarget[],
  TState,
  TActions extends Record<string, unknown>
> = CommonRuleArgs<TState, TActions> & {
  action: {
    [TTarget in TTargets[number]]: {
      type: TTarget;
      payload: ExtractFirstArgumentType<TTarget>;
      meta: ExtractArgumentsType<
        ActionFunction<ExtractStoreName<TTarget>, ExtractActionName<TTarget>>
      >;
      skipRule?: string | string[];
    };
  }[TTargets[number]];
};

type SingleRuleTargetArgs<
  TTarget extends RuleTarget,
  TState,
  TActions extends Record<string, unknown>
> = CommonRuleArgs<TState, TActions> & {
  action: {
    type: TTarget;
    payload: ExtractFirstArgumentType<TTarget>;
    meta: ExtractArgumentsType<
      ActionFunction<ExtractStoreName<TTarget>, ExtractActionName<TTarget>>
    >;
    skipRule?: string | string[];
  };
};

type CommonRuleArgs<TState, TActions extends Record<string, unknown>> = {
  store: Store<TState, TActions>;
  wasCanceled: () => boolean;
  effect: (fn: (...args: any[]) => void) => void;
  getStore: (name: string, key?: string) => Store<TState, TActions> | null;
  getStores: (name: string) => Store<TState, TActions>[];
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
