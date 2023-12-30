import React from 'react'
import createStoreFactory from '@rlx/core'
import { StoreConfig } from '@rlx/core/src/types'

const createStore = createStoreFactory({
  injectFramework: store => ({
    ...store,
    useStateValue: () => {
      const [state, setState] = React.useState(store.getState)
      React.useEffect(() => store.subscribe(setState), [])
      return state
    }
  }),
  getInstanceId: (createId) => React.useState(createId)[0],
  onMount: cb => { React.useEffect(cb, []) },
  onDestroy: cb => { React.useEffect(() => cb, []) },
})

export default createStore;

/**
 * @param config 
 * @returns A tuple of state and the corresponing store - [state, store]
 */
export function useStore(config: StoreConfig) {
  const store = React.useMemo(() => createStore(config), [config])
  
  const [state, setState] = React.useState(store.getState)
  
  React.useEffect(() => {
    const unsubscribe = store.subscribe(setState)
    return unsubscribe
  }, [])

  return [state, store]
}