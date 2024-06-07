import setupTest from "../setup-test"

describe('store -> general', () => {
  it('dispatches @mount action when store mounts', () => {
    const c = setupTest({preventAutoMount:true})
    c.createStore({name: 'my-name'})

    expect(c.managers.rule.dispatch).not.toBeCalledWith(expect.objectContaining({
      action: {type: 'my-name/@mount', meta: [], payload: null}
    }))

    c.mountFnRef.current()

    expect(c.managers.rule.dispatch).toBeCalledWith(expect.objectContaining({
      action: {type: 'my-name/@mount', meta: [], payload: null},
    }))
  })

  it('dispatches @destroy action when store unmounts', () => {
    const c = setupTest()
    c.createStore({name: 'my-name'})

    expect(c.managers.store.db.has('my-name')).toBeTruthy()
    c.destroyFnRef.current()
    expect(c.managers.rule.dispatch).toBeCalledWith(expect.objectContaining({
      action: {type: 'my-name/@destroy', meta: [], payload: null},
    }))
    expect(c.managers.store.db.has('my-name')).toBeFalsy()
  })

  it('store.subscribe only triggers when the last action is dispatched', async () => {
    const c = setupTest()

    const store = c.createStore({
      name: 'test',
      state: 'initial',
      actions: {
        action1: () => () => 'action1',
        action2: () => () => 'action2',
        action3: () => () => 'action3',
      }
    })

    store.addRule({id: 'rule1', target: '/action1', consequence: ({store}) => store.actions.action2()})
    store.addRule({id: 'rule1', target: '/action2', consequence: ({store}) => store.actions.action3()})

    const callback = jest.fn()
    store.subscribe(callback)

    store.actions.action1()

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenLastCalledWith('action3')
  })

  it.todo('will no dispatch @destroy when at least one store reference is active')
})