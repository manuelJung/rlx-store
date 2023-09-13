import setupTest from "../setup-test"

describe('store -> state', () => {
  it('defines the initial store-state on instanciation', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      state: 0,
    })
    expect(store.getState()).toBe(0)
  })

  it('does nothing when value dynamically changes (and instance was already created)', () => {
    const c = setupTest()
    c.createStore({
      name: 'my-name',
      state: 0,
    })
    const store = c.createStore({
      name: 'my-name',
      state: 10,
    })
    expect(store.getState()).toBe(0)
  })

  it('can be an object', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      state: {foo:'bar'},
    })
    expect(store.getState()).toEqual({foo:'bar'})
  })

  it('can be a primitive', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      state: 'foo',
    })
    expect(store.getState()).toBe('foo')
  })
})