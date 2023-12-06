import setupTest from "../setup-test"

describe('rule -> onExecute', () => {
  it('removes rule after first execution for REMOVE_RULE', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      state: 0,
      actions: { foo: () => () => 1 }
    })
    const consequence = jest.fn()
    store.addRule({
      id: 'foo',
      onExecute: 'REMOVE_RULE',
      target: 'my-name/foo',
      consequence
    })

    store.actions.foo()
    store.actions.foo()

    expect(consequence).toBeCalledTimes(1)
  })

  it('cannot call consequence twice (even when async) for REMOVE_RULE', async () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      state: 0,
      actions: { foo: () => () => 1 }
    })
    const consequence = jest.fn()
    store.addRule({
      id: 'foo',
      onExecute: 'REMOVE_RULE',
      target: 'my-name/foo',
      consequence: async () => {
        await new Promise(r => setTimeout(r, 10))
        consequence()
      }
    })

    store.actions.foo()
    store.actions.foo()

    await new Promise(r => setTimeout(r, 20))

    expect(consequence).toBeCalledTimes(1)
  })

  it.todo('RECREATE_RULE (saga needed)')
})