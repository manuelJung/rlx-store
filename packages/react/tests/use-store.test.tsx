import * as React from 'react'
import {render} from '@testing-library/react'
import { UseStoreComponent } from './test-utils'
import { StoreConfig } from '@rlx/core/src/types'

describe('useStore', () => {
    it('renders a component using useStore correctly', () => {
        const config: StoreConfig = {
            name: 'test',
            state: 'test',
            actions: {
                test: () => 'test'
            }
        }
        const {getByText} = render(<UseStoreComponent config={config}/>)
        expect(getByText('test')).toBeTruthy()
    })
})