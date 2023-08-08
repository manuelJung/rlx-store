import * as t from '../types'

export type GlobalRegisterStoreEvent = {
  type: 'REGISTER_STORE'
  container: t.StoreContainer
}

export type GlobalTestEvent2 = {
  type: 'GLOBAL_TEST_EVENT_2'
}

export type GlobalEvent =
| GlobalRegisterStoreEvent
| GlobalTestEvent2