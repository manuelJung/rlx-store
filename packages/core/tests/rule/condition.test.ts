import consequence from "../../src/rule/consequence"
import setupTest from "../setup-test"

describe('rule -> condition', () => {
  describe('arguments', () => {
    it('action: the dispatched action', () => {
      const c = setupTest()
      const store = c.createStore({
        name: 'test',
        actions: {
          myAction: (id:string) => state => state,
        }
      })
      let action:any = null
      store.addRule({
        id: 'effect',
        target: 'test/myAction',
        condition: args => {
          action = args.action
          return false
        },
        consequence: () => null
      })

      store.myAction('id')

      expect(action).toEqual({
        type: 'test/myAction',
        meta: ['id'],
        payload: 'id',
      })
    })

    it('store: the store which dispatched the action', () => {
      const c = setupTest()
      const store = c.createStore({
        name: 'test',
        actions: {
          myAction: (id:string) => state => state,
        }
      })
      let consequenceStore:any = null
      store.addRule({
        id: 'effect',
        target: 'test/myAction',
        condition: args => {
          consequenceStore = args.store
          return false
        },
        consequence: () => null
      })
  
      store.myAction('id')
  
      expect(consequenceStore).toBe(store)
    })

    it('getStore: returns a store (or null) by name and key', () => {
      const c = setupTest()
      const store = c.createStore({
        name: 'test',
        actions: {
          myAction: (id:string) => state => state,
        }
      })
      let consequenceStoreFound:any = null
      let consequenceStore404:any = null
      store.addRule({
        id: 'effect',
        target: 'test/myAction',
        condition: args => {
          consequenceStoreFound = args.getStore('test')
          consequenceStore404 = args.getStore('not-found')
          return false
        },
        consequence: () => null,
      })

      store.myAction('id')

      expect(consequenceStoreFound).toEqual({
        ...store,
        dispatchWrapper: expect.anything()
      })

      expect(consequenceStore404).toBe(null)
    })

    it('getStores: returns all stores by name', () => {
      const c = setupTest()
      const store = c.createStore({
        name: 'test',
        actions: {
          myAction: (id:string) => state => state,
        }
      })
      let consequenceStoreFound:any = null
      let consequenceStore404:any = null
      store.addRule({
        id: 'effect',
        target: 'test/myAction',
        condition: args => {
          consequenceStoreFound = args.getStores('test')
          consequenceStore404 = args.getStores('not-found')
          return false
        },
        consequence: () => null
      })

      store.myAction('id')

      expect(consequenceStoreFound).toEqual([{
        ...store,
        dispatchWrapper: expect.anything()
      }])

      expect(consequenceStore404).toEqual([])
    })
  })

  it('can prevent action execution', () => {
    const c = setupTest()
    const consequence = jest.fn()
    const store = c.createStore({
      name: 'test',
      actions: {
        myAction: (id:string) => state => state
      }
    })
    let run = false
    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      condition: () => run,
      consequence: consequence,
    })

    store.myAction('foo')
    expect(consequence).not.toBeCalledWith(expect.objectContaining({
      action: {
        type: 'test/myAction',
        meta: ['foo'],
        payload: 'foo',
      }
    }))

    run = true
    store.myAction('foo')
    expect(consequence).toBeCalledWith(expect.objectContaining({
      action: {
        type: 'test/myAction',
        meta: ['foo'],
        payload: 'foo',
      }
    }))
  })
  
})