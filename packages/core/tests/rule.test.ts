import setupTest from "./setup-test"

describe('rule', () => {

  it('prevents consequence execution when condition does not match', () => {
    const c = setupTest()
    const consequence = jest.fn()
    const store = c.createStore({
      name: 'test',
      actions: {
        myAction: (id:string) => state => state
      }
    })
    let run = false
    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      condition: () => run,
      consequence: consequence,
    })

    store.myAction('foo')
    expect(consequence).not.toBeCalledWith(expect.objectContaining({
      action: {
        type: 'test/myAction',
        meta: ['foo'],
        payload: 'foo',
      }
    }))

    run = true
    store.myAction('foo')
    expect(consequence).toBeCalledWith(expect.objectContaining({
      action: {
        type: 'test/myAction',
        meta: ['foo'],
        payload: 'foo',
      }
    }))
  })

  
})