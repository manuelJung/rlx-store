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

      store.actions.myAction('id')

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

      store.actions.myAction('id')

      expect(consequenceStore).toEqual({
        ...store,
        actions: {
          ...store.actions,
          dispatchWrapper: expect.anything()
        }
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
          consequenceStoreFound = args.getStore('test')
          consequenceStore404 = args.getStore('not-found')
        }
      })

      store.actions.myAction('id')

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
        consequence: args => {
          consequenceStoreFound = args.getStores('test')
          consequenceStore404 = args.getStores('not-found')
        }
      })

      store.actions.myAction('id')

      expect(consequenceStoreFound).toEqual([{
        ...store,
        dispatchWrapper: expect.anything()
      }])

      expect(consequenceStore404).toEqual([])
    })
  })

  it('can dispatch actions', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      actions: {
        myAction: (id:string) => state => state,
        otherAction: (id:string) => state => state,
      }
    })
    store.actions.myAction = jest.fn(store.actions.myAction)
    store.actions.otherAction = jest.fn(store.actions.otherAction)
    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      consequence: ({store}) => store.actions.otherAction('bar'),
    })

    store.actions.myAction('foo')
    expect(store.actions.myAction).toBeCalledWith('foo')
    expect(store.actions.otherAction).toBeCalledWith('bar')
  })

  it.skip('can manipulate actions by returning action (with position INSTEAD)', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      state: 'init',
      actions: {
        myAction: (id:string) => () => id
      }
    })

    store.addRule({
      id: 'test',
      target: 'test/myAction',
      position: 'INSTEAD',
      consequence: args => ({
        ...args.action,
        meta: ['bar'],
        payload: 'bar'
      })
    })

    store.actions.myAction('foo')

    expect(store.getState()).toBe('bar')
  })

  it('will call returned function when execution gets canceled', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      actions: {
        myAction: (id:string) => state => state
      }
    })

    const cb = jest.fn()

    store.addRule({
      id: 'test',
      target: 'test/myAction',
      concurrency: 'LAST',
      consequence: args => {
        return () => cb(args.action.payload)
      }
    })

    store.actions.myAction('first')

    expect(cb).not.toBeCalled()

    store.actions.myAction('second')

    expect(cb).toBeCalledWith('first')
  })
})