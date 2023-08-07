import { startAddWhenSaga } from './effect/saga'
import { createEffectContainer } from './effect/utils'
import * as t from './types'

export default function createEffectManager (args:t.FactoryArgs, managers:t.Managers) {
  const db = new Map<string,t.EffectContainer>()
  const activeEffects:t.ActiveEffects = {
    BEFORE: {},
    INSTEAD: {},
    AFTER: {},
  }

  return {
    register: (effect:t.Effect, storeContainer?:t.StoreContainer) => {
      const id = effect.id + (storeContainer?.id ?? '')
      if(db.has(id)) return
      const container = createEffectContainer(effect)
      db.set(id, container)
      startAddWhenSaga(container)

      if(storeContainer) {
        // TODO
      }
    },
    dispatch: (action:t.Action, cb:()=>void) => {

    }
  }
}