
export type StoreTestEvent1 = {
  type: 'STORE_TEST_EVENT_1'
  payload: number
}

export type StoreTestEvent2 = {
  type: 'STORE_TEST_EVENT_2'
}

export type StoreEvent =
| StoreTestEvent1
| StoreTestEvent2