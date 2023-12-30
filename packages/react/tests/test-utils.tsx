import React from 'react'
import { useStore } from '../src'
import { StoreConfig } from '@rlx/core/src/types';

type Props = {
    config: StoreConfig
}

export function UseStoreComponent(props: Props) {
    const [state, _store] = useStore(props.config);
    return (
      <div>{state}</div>
    )
}
