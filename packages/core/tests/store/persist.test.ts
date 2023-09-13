import setupTest from "../setup-test"

describe('store -> persist', () => {
  it('prevents store from destroying when last parent unmounts', () => {
    const c = setupTest()
    c.createStore({name: 'my-name', persist: true})

    c.destroyFnRef.current()
    expect(c.managers.store.db.has('my-name')).toBeTruthy()
  })

  it('let store unmount when value is false|undefined', () => {
    const c = setupTest()
    c.createStore({name: 'my-name', persist: false})

    c.destroyFnRef.current()
    expect(c.managers.store.db.has('my-name')).toBeFalsy()
  })
})