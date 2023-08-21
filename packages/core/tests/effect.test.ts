import setupTest from "./setup-test"

describe('effect', () => {
  it('can react to store actions', () => {
    const c = setupTest()

    const consequence = jest.fn()
    const store = c.createStore({
      name: 'test',
      actions: {
        myAction: (id:string) => state => state
      }
    })
    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      consequence: consequence,
    })

    store.myAction('foo')
    expect(consequence).toBeCalledWith(expect.objectContaining({
      action: {
        type: 'test/myAction',
        meta: ['foo'],
        payload: 'foo',
      }
    }))
  })

  it('can dispatch action in consequence', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      actions: {
        myAction: (id:string) => state => state,
        otherAction: (id:string) => state => state,
      }
    })
    store.myAction = jest.fn(store.myAction)
    store.otherAction = jest.fn(store.otherAction)
    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      consequence: ({store}) => store.otherAction('bar'),
    })

    store.myAction('foo')
    expect(store.myAction).toBeCalledWith('foo')
    expect(store.otherAction).toBeCalledWith('bar')
  })

  it.todo('dispatches actions that are resolved in consequence')
})