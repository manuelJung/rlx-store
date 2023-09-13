import setupTest from "../setup-test"

describe('rule -> target', () => {
  it('triggers rule execution for single action', () => {
    const c = setupTest()

    const store = c.createStore({
      name: 'my-name',
      actions: {
        action1: () => state => state,
      }
    })

    const consequence = jest.fn()

    store.addRule({
      id: 'rule-id',
      target: 'my-name/action1',
      consequence,
    })

    store.action1()

    expect(consequence).toBeCalled()
  })

  it('triggers rule execution for multiple actions', () => {
    const c = setupTest()

    const store = c.createStore({
      name: 'my-name',
      actions: {
        action1: () => state => state,
        action2: () => state => state,
      }
    })

    const consequence = jest.fn()

    store.addRule({
      id: 'rule-id',
      target: ['my-name/action1', 'my-name/action2'],
      consequence,
    })

    store.action1()
    expect(consequence).toBeCalledTimes(1)

    store.action2()
    expect(consequence).toBeCalledTimes(2)
  })

  it('autofills store-name', () => {
    const c = setupTest()

    const store = c.createStore({
      name: 'my-name',
      actions: {
        action1: () => state => state,
      }
    })

    const consequence = jest.fn()

    store.addRule({
      id: 'rule-id',
      target: '/action1',
      consequence,
    })

    store.action1()

    expect(consequence).toBeCalled()
  })
})