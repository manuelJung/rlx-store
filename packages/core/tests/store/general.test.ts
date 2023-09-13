import setupTest from "../setup-test"

describe('store -> general', () => {
  it('dispatches @mount action when store mounts', () => {
    const c = setupTest({preventAutoMount:true})
    c.createStore({name: 'my-name'})

    expect(c.managers.rule.dispatch).not.toBeCalledWith(
      {type: 'my-name/@mount', meta: [], payload: null},
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    c.mountFnRef.current()

    expect(c.managers.rule.dispatch).toBeCalledWith(
      {type: 'my-name/@mount', meta: [], payload: null},
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
  })

  it('dispatches @destroy action when store unmounts', () => {
    const c = setupTest()
    c.createStore({name: 'my-name'})

    expect(c.managers.store.db.has('my-name')).toBeTruthy()
    c.destroyFnRef.current()
    expect(c.managers.rule.dispatch).toBeCalledWith(
      {type: 'my-name/@destroy', meta: [], payload: null},
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    expect(c.managers.store.db.has('my-name')).toBeFalsy()
  })

  it.todo('will no dispatch @destroy when at least one store reference is active')
})