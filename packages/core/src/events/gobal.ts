
export type GlobalTestEvent1 = {
  type: 'GLOBAL_TEST_EVENT_1'
  payload: number
}

export type GlobalTestEvent2 = {
  type: 'GLOBAL_TEST_EVENT_2'
}

export type GlobalEvent =
| GlobalTestEvent1
| GlobalTestEvent2