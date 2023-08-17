import * as t from '../types'
import { activateRule, destroyRule } from './utils'

export function startAddWhenSaga (container:t.RuleContainer) {
  let uncall = () => {}
  if(container.storeContainer) {
    container.storeContainer.events.once('DESTROY', () => {
      destroyRule(container)
    })
  }

  activateRule(container)
}

export function startAddUntilSaga (container:t.RuleContainer) {
  // TODO
}