import createRuleManager from "./createRuleManager"
import createStoreManager from "./createStoreManager"
import { RuleEvent } from "./events/rule"
import { GlobalEvent } from "./events/gobal"
import { StoreEvent } from "./events/store"
import { createEventContainer } from "./utils"


export type Managers = {
  store: ReturnType<typeof createStoreManager>
  rule: ReturnType<typeof createRuleManager>
  events: ReturnType<typeof createEventContainer<GlobalEvent>>
}

export type FactoryArgs = {
  injectFramework: (store:Store) => Store
  getInstanceId: (createId:()=>string) => string
  onMount: (cb:()=>void) => void
  onDestroy: (cb:()=>void) => void
}

export type FunctionAction = (state:any) => any

export type AsyncActionConfig = {
  fetcher: (state:any) => Promise<any>
}

export type StoreConfig = {
  name: string
  key?: string
  state: any
  persist?: boolean
  actions: Record<string, (...args:any[]) => (FunctionAction|AsyncActionConfig)>
}

export type Store = {
  name: string
  key?: string
  getState: () => any
  subscribe: (cb:(state:any)=>void) => () => void
  addRule: (rule:Rule) => void
  dispatchWrapper?: (fn:any) => void
}

export type StoreContainer = {
  id: string
  store: Store & Record<string, any>
  state: any
  numParents: number
  events: ReturnType<typeof createEventContainer<StoreEvent>>
  subscriptions: ((state:any)=>void)[]
}

export type CTX = {
  set: (key:string, value:unknown) => unknown,
  get: (key:string) => unknown
}

export type Action = {
  type: string
  meta: any[],
  skipRule?: string | string[]
  payload: any
}

export type RuleContainer = {
  id: string
  rule: Rule
  active: boolean
  events: ReturnType<typeof createEventContainer<RuleEvent>>
  ruleDb: Map<string, RuleContainer>
  activeRules: ActiveRules
  storeContainer: StoreContainer | null
  concurrency: {[name:string]:{
    running: number,
    debounceTimeoutId: null | ReturnType<typeof setTimeout>
  }},
  publicContext: {
    global: {[key:string]:unknown},
    addWhen: {[key:string]:unknown},
    addUntil: {[key:string]:unknown}
  },
  // runningSaga: null
  // parentContext: null | RuleContainer
  // subRuleContextCounter: number
  // subRuleContexts: [],
  // concurrency: {},
  // publicContext: {
  //   global: {},
  //   addWhen: {},
  //   addUntil: {}
  // }
}

export type ConditionArgs = {
  action: Action
  store: Store & Record<string, any>
  getStore: (name:string, key?:string) => Store | null
  getStores: (name:string) => Store[]
}

export type ConsequenceArgs = {
  action: Action
  store: Store & Record<string, any>
  wasCanceled: () => boolean
  effect: (fn:(...args:any[])=>void) => void
  getStore: (name:string, key?:string) => Store | null
  getStores: (name:string) => Store[]
}

export type Rule = {
  id: string
  target: string | string[]
  consequence: (args:ConsequenceArgs) => Promise<any> | any
  condition?: (args:ConditionArgs) => Boolean
  weight?: number
  position?: RulePosition
  output?: string | string[]
  concurrency?: 'DEFAULT' | 'FIRST' | 'LAST' | 'ONCE' | 'SWITCH'
  concurrencyFilter?: (action:Action) => string
  onExecute?: 'REMOVE_RULE' | 'RECREATE_RULE'
  throttle?: number
  debounce?: number
  delay?: number
}

export type ActiveRules = {
  BEFORE: Record<string, RuleContainer[]>
  INSTEAD: Record<string, RuleContainer[]>
  AFTER: Record<string, RuleContainer[]>
}

export type ActionExecution = {
  execId: number
  ruleExecId: number | null
  canceled: boolean
  history: []
  action: Action
  storeContainer: StoreContainer
  cb: (...args:any[]) => any
}

export type RuleExecution = {
  execId: number
  concurrencyId: string,
  actionExecId: number,
  canceled: boolean,
}

export type RulePosition = 'BEFORE' | 'INSTEAD' | 'AFTER'