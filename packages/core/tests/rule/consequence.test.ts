import setupTest from "../setup-test"

describe('rule -> consequence', () => {

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
        consequence: args => {
          action = args.action
        }
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
        consequence: args => {
          consequenceStore = args.store
        }
      })

      store.myAction('id')

      expect(consequenceStore).toEqual({
        ...store,
        dispatchWrapper: expect.anything()
      })
    })
  
    it.todo('wasCanceled: can check if execution was canceled')

    it.todo('effect: can execute side effects while execution was not canceled')

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
        consequence: args => {
          consequenceStoreFound = args.getStore('test', '')
          consequenceStore404 = args.getStore('not-found', '')
        }
      })

      store.myAction('id')

      expect(consequenceStoreFound).toEqual({
        ...store,
        dispatchWrapper: expect.anything()
      })

      expect(consequenceStore404).toBe(null)
    })

    it.todo('getStores: returns all stores by name')
  })

  it.todo('can dispatch actions')

  it.todo('can manipulate actions by returning action (with position INSTEAD)')
})