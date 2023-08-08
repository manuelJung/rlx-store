import dispatchEvent from './effect/dispatchEvent'
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
    db,
    activeEffects,
    register: (effect:t.Effect, storeContainer?:t.StoreContainer) => {
      const id = effect.id + (storeContainer?.id ?? '')
      if(db.has(id)) return
      const container = createEffectContainer(effect, db, activeEffects, storeContainer)
      db.set(id, container)
      managers.events.trigger({type:'REGISTER_EFFECT', container})
      startAddWhenSaga(container)
    },
    dispatch: (action:t.Action, cb:()=>void) => dispatchEvent(action, activeEffects, cb)
  }
}