import setupTest from "./setup-test"
import * as t from '../src/types'


describe('store api', () => {
  describe('name', () => {
    it('acts as id for store-db', () => {
      const c = setupTest()
      c.createPartialStore({name: 'my-name'})
      expect(c.managers.store.db.has('my-name')).toBeTruthy()
    })

    it('is propagated to store as "name"', () => {
      const c = setupTest()
      c.createPartialStore({name: 'my-name'})
      const container = c.managers.store.db.get('my-name')
      if(!container) throw new Error('no container found')
      expect(container.store.name).toBe('my-name')
    })

    it('creates a totally new store instance when value changes', () => {
      const c = setupTest()
      let mountCounter = 0
      c.managers.events.on('REGISTER_STORE', () => mountCounter++)
      c.createPartialStore({name: 'my-name'})
      c.createPartialStore({name: 'my-name'})
      c.createPartialStore({name: 'other-name'})
      expect(mountCounter).toBe(2)
    })
    
    it('acts as prefix for each actiontype', () => {
      const c = setupTest()
      const store = c.createPartialStore({
        name: 'my-name',
        actions: {
          test: () => () => null
        }
      })
      const fn = (store as any).test as () => t.Action | null
      const dispatch = jest.fn(c.managers.effect.dispatch)
      c.managers.effect.dispatch = dispatch
      const action = fn()
      expect(action?.type).toBe('my-name/test')
      expect(dispatch).toBeCalledWith({type:'my-name/test', meta: [], payload: undefined})
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