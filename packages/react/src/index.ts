import createStoreFactory from '../../core/src'
import React from 'react'
import x from '@rlx/core'

export default createStoreFactory({
  injectFramework: store => ({
    ...store,
    useState: () => {
      const [state, setState] = React.useState(store.getState)
      React.useEffect(() => store.subscribe(setState), [])
      return state
    }
  }),
  getInstanceId: (createId) => React.useState(createId)[0],
  onMount: cb => { React.useEffect(cb, []) },
  onDestroy: cb => { React.useEffect(() => cb, []) },
})