import * as t from './types'

export default function createEffectManager (args:t.FactoryArgs, managers:t.Managers) {
  const db = new Map()

  return {
    dispatch: (action:t.Action, cb:()=>void) => {

    }
  }
}