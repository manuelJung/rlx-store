
export type StoreDestroyEvent = {
  type: 'DESTROY'
}

export type StoreMountEvent = {
  type: 'MOUNT'
}

export type StoreEvent =
| StoreDestroyEvent
| StoreMountEvent