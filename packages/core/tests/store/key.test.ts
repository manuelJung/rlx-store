import setupTest from "../setup-test"

describe('store -> key', () => {
  it('acts as id for store-db (with "name") to create cachable instances', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      key: 'foo'
    })
    expect(c.managers.store.db.has('my-namefoo'))
  })

  it('is propagated to store as "key"', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      key: 'foo'
    })
    expect(store.key).toBe('foo')
  })

  it('creates a totally new store instance when value changes', () => {
    const c = setupTest()
    const storeA = c.createStore({
      name: 'my-name',
      key: 'foo'
    })
    const storeB = c.createStore({
      name: 'my-name',
      key: 'foo'
    })
    const storeC = c.createStore({
      name: 'my-name',
      key: 'bar'
    })

    expect(storeA).toBe(storeB)
    expect(storeA).not.toBe(storeC)
  })
})