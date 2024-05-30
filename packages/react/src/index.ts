import React from 'react'
import createStoreFactory from '@rlx/core'

const createStore = createStoreFactory({
  injectFramework: store => ({
    ...store,
    useState: (selector = defaultSelector, equalityFn) => {
      const equalityCache = equalityFn ? equalityFn(store.getState()) : null
      const cacheRef = React.useRef(equalityCache)
      cacheRef.current = equalityCache

      const [state, setState] = React.useState(() => selector(store.getState))

      React.useEffect(() => store.subscribe((newState) => {
        const newSelectedState = selector(newState)
        if (!equalityFn) {
          if (isShallowEqual(state, newSelectedState)) {
            return;
          }
          return setState(newSelectedState)
        }
        if (isShallowEqual(cacheRef.current, equalityFn(newState))) {
          return;
        }
        setState(newSelectedState)
      }), [])

      return state
    }
  }),
  onMount: cb => { React.useEffect(cb, []) },
  onDestroy: cb => { React.useEffect(() => cb, []) },
})

export default createStore;

function defaultSelector(state: any) {
  return state;
}

function isShallowEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (!a || !b) {
    return false;
  }

  const aIsArr = Array.isArray(a);
  const bIsArr = Array.isArray(b);

  if (aIsArr !== bIsArr) {
    return false;
  }
  // array comparison
  if (aIsArr && bIsArr) {
    const len = a.length;
  
    if (b.length !== len) {
      return false;
    }
  
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  // object comparison
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (let i = 0; i < len; i++) {
    const key = aKeys[i];

    if (
      a[key] !== b[key] ||
      !Object.prototype.hasOwnProperty.call(b, key)
    ) {
      return false;
    }
  }

  return true;
}