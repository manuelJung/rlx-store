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
    expect(consequence).toBeCalledWith({
      type: 'test/myAction',
      meta: ['foo'],
      payload: 'foo',
    })
  })

  it.todo('dispatches actions that are returned in consequence')

  it.todo('dispatches actions that are resolved in consequence')
})