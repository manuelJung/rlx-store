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
  (...payload: any) => (state: State) => any
>;

export type CreateStore<TState, TActions> = {
  getState: () => TState;
  actions: TActions;
  addRule: <TTarget extends RuleTarget | RuleTarget[]>(
    rule: Rule<TTarget, TState>
  ) => void;
  key?: string;
  subscribe: (cb: (state: TState) => void) => () => void;
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

type Rule<TTarget extends RuleTarget | RuleTarget[], TState> = {
  target: TTarget;
  consequence?: (args: ConsequenceArgs<TTarget, TState>) => void;
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
  TState
> = TTarget extends RuleTarget[]
  ? RuleTargetArrayArgs<TTarget, TState>
  : TTarget extends RuleTarget
  ? SingleRuleTargetArgs<TTarget, TState>
  : never;

type RuleTargetArrayArgs<TTargets extends RuleTarget[], TState> = {
  action: {
    [TTarget in TTargets[number]]: {
      type: TTarget;
      payload: ExtractFirstArgumentType<TTarget>;
      meta: ExtractArgumentsType<
        ActionFunction<ExtractStoreName<TTarget>, ExtractActionName<TTarget>>
      >;
    };
  }[TTargets[number]];
  getState: () => TState;
};

type SingleRuleTargetArgs<TTarget extends RuleTarget, TState> = {
  action: {
    type: TTarget;
    payload: ExtractFirstArgumentType<TTarget>;
    meta: ExtractArgumentsType<
      ActionFunction<ExtractStoreName<TTarget>, ExtractActionName<TTarget>>
    >;
  };
  getState: () => TState;
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
