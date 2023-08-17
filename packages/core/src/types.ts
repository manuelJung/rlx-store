import createEffectManager from "./createEffectManager"
import createStoreManager from "./createStoreManager"
import { EffectEvent } from "./events/effect"
import { GlobalEvent } from "./events/gobal"
import { StoreEvent } from "./events/store"
import { createEventContainer } from "./utils"


export type Managers = {
  store: ReturnType<typeof createStoreManager>
  effect: ReturnType<typeof createEffectManager>
  events: ReturnType<typeof createEventContainer<GlobalEvent>>
}

export type FactoryArgs = {
  injectFramework: (store:Store) => Store
  getInstanceId: (createId:()=>string) => string
  onMount: (cb:()=>void) => void
  onDestroy: (cb:()=>void) => void
}

export type StoreConfig = {
  name: string
  key?: string
  state: any
  persist?: boolean
  actions: Record<string, (...args:any[]) => any>
}

export type Store = {
  name: string
  key?: string
  getState: () => any
  subscribe: (cb:(state:any)=>void) => () => void
  sideEffect: (effect:Effect) => void
}

export type StoreContainer = {
  id: string
  store: Store
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

export type EffectContainer = {
  id: string
  effect: Effect
  active: boolean
  events: ReturnType<typeof createEventContainer<EffectEvent>>
  effectDb: Map<string, EffectContainer>
  activeEffects: ActiveEffects
  storeContainer: StoreContainer | null
  concurrency: {[name:string]:{
    running: number,
    debounceTimeoutId: null | number
  }},
  publicContext: {
    global: {[key:string]:unknown},
    addWhen: {[key:string]:unknown},
    addUntil: {[key:string]:unknown}
  },
  // runningSaga: null
  // parentContext: null | EffectContainer
  // subEffectContextCounter: number
  // subEffectContexts: [],
  // concurrency: {},
  // publicContext: {
  //   global: {},
  //   addWhen: {},
  //   addUntil: {}
  // }
}

export type Effect = {
  id: string
  target: string | string[]
  consequence: (action:Action) => Action | Promise<Action> | void
  condition?: (action:Action) => Boolean
  weight?: number
  position?: EffectPosition
  output?: string | string[]
  concurrency?: 'DEFAULT' | 'FIRST' | 'LAST' | 'ONCE' | 'SWITCH'
  concurrencyFilter?: (action:Action) => string
  onExecute?: 'REMOVE_RULE' | 'RECREATE_RULE'
  throttle?: number
  debounce?: number
}

export type ActiveEffects = {
  BEFORE: Record<string, EffectContainer[]>
  INSTEAD: Record<string, EffectContainer[]>
  AFTER: Record<string, EffectContainer[]>
}

export type ActionExecution = {
  execId: number
  ruleExecId: number
  canceled: boolean
  history: [],
  action: Action
}

export type EffectExecution = {
  execId: number
  concurrencyId: string,
  actionExecId: number
}

export type EffectPosition = 'BEFORE' | 'INSTEAD' | 'AFTER'