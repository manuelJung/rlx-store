import createEffectManager from "./createEffectManager"
import createStoreManager from "./createStoreManager"
import { createEventContainer } from "./effect/utils"


export type Managers = {
  store: ReturnType<typeof createStoreManager>
  effect: ReturnType<typeof createEffectManager>
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
  subscriptions: ((state:any)=>void)[]
}

export type Action = {
  type: string
  meta: any[],
  payload: any
}

export type EffectContainer = {
  id: string
  effect: Effect
  active: boolean
  dropped: boolean
  events: ReturnType<typeof createEventContainer>
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
  output?: string | string[]
}

export type ActiveEffects = {
  BEFORE: Record<string, EffectContainer[]>
  INSTEAD: Record<string, EffectContainer[]>
  AFTER: Record<string, EffectContainer[]>
}