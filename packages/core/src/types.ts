import createEffectManager from "./createEffectManager"
import createStoreManager from "./createStoreManager"


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