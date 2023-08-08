
export type StoreDestroyEvent = {
  type: 'DESTROY'
}

export type StoreTestEvent2 = {
  type: 'STORE_TEST_EVENT_2'
}

export type StoreEvent =
| StoreDestroyEvent
| StoreTestEvent2