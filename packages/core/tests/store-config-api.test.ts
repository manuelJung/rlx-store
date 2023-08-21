import setupTest from "./setup-test"


describe('store api', () => {
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
      )
    })
  })

  describe('key', () => {
    it.todo('acts as id for store-db (with "name") to create cachable instances')

    it.todo('is propagated to store as "key"')

    it.todo('creates a totally new store instance when value changes')
  })

  describe('state', () => {
    it.todo('defines the initial store-state on instanciation')

    it.todo('does nothing when value dynamically changes (and instance was already created)')

    it.todo('can be an object')

    it.todo('can be a primitive')
  })

  describe('persist', () => {
    it.todo('prevents store from destroying when last parent unmounts')

    it.todo('let store unmount when value is false|undefined')
  })
})