import * as t from '../types'

let execId = 1
let wrappedExecIds = []
export const getCurrentConsequenceExecId = () => wrappedExecIds[wrappedExecIds.length-1] || null

export default function consequence (
  actionExecution: t.ActionExecution,
  container: t.EffectContainer,
) {
  container.effect.consequence(actionExecution.action)
}