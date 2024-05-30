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

  it.todo('will no dispatch @destroy when at least one store reference is active')
})