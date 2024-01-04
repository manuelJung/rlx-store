import React from 'react'
import createStoreFactory from '@rlx/core'

export default createStoreFactory({
  injectFramework: store => ({
    ...store,
    useState: () => {
      const [state, setState] = React.useState(store.getState)
      React.useEffect(() => store.subscribe(setState), [])
      return state
    }
  }),
  onMount: cb => { React.useEffect(cb, []) },
  onDestroy: cb => { React.useEffect(() => cb, []) },
})