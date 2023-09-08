import setupTest from "./setup-test"


describe('store api', () => {
  describe('general', () => {
    it.todo('dispatches @mount action when store mounts')

    it.todo('dispatches @destroy action when store unmounts')

    it.todo('will no dispatch @destroy when at least one store reference is active')
  })

  describe('name', () => {
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

  describe('key', () => {
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

  describe('state', () => {
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

  describe('persist', () => {
    it.todo('prevents store from destroying when last parent unmounts')

    it.todo('let store unmount when value is false|undefined')
  })
})