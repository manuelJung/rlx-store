import * as t from '../types'
import { activateEffect, destroyEffect } from './utils'

export function startAddWhenSaga (container:t.EffectContainer) {
  let uncall = () => {}
  if(container.storeContainer) {
    container.storeContainer.events.once('DESTROY', () => {
      destroyEffect(container)
    })
  }

  activateEffect(container)
}

export function startAddUntilSaga (container:t.EffectContainer) {
  // TODO
}