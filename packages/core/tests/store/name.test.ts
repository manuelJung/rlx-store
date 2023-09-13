import setupTest from "../setup-test"

describe('store -> name', () => {
  it('acts as id for store-db', () => {
    const c = setupTest()
    c.createStore({name: 'my-name'})
    expect(c.managers.store.db.has('my-name')).toBeTruthy()
  })

  it('is propagated to store as "name"', () => {
    const c = setupTest()
    c.createStore({name: 'my-name'})
    const container = c.managers.store.db.get('my-name')
    if(!container) throw new Error('no container found')
    expect(container.store.name).toBe('my-name')
  })

  it('creates a totally new store instance when value changes', () => {
    const c = setupTest()
    const store1 = c.createStore({name: 'my-name'})
    const store2 = c.createStore({name: 'my-name'})
    const store3 = c.createStore({name: 'other-name'})
    expect(store1).toBe(store2)
    expect(store2).not.toBe(store3)
    expect(c.managers.store.db.has('my-name')).toBeTruthy()
    expect(c.managers.store.db.has('other-name')).toBeTruthy()
  })
  
  it('acts as prefix for each actiontype', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      actions: { test: () => () => null }
    })
    const action = store.test()
    expect(action?.type).toBe('my-name/test')
    expect(c.managers.rule.dispatch).toBeCalledWith(
      {type:'my-name/test', meta: [], payload: undefined}, 
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
  })

  it('created totally new store instance when value changes', () => {
    const c = setupTest()
    const storeA = c.createStore({
      name: 'my-name',
    })
    const storeB = c.createStore({
      name: 'my-name',
    })
    const storeC = c.createStore({
      name: 'my-other-name',
    })

    expect(storeA).toBe(storeB)
    expect(storeA).not.toBe(storeC)
  })
})