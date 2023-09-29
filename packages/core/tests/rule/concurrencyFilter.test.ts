import setupTest from "../setup-test"

describe('rule -> concurrencyFilter', () => {
  const wait = (ms:number) => new Promise(r => setTimeout(r, ms))

  it('recieves the dispatched action as an argument', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      state: [],
      actions: {
        myAction: (id:string) => state => state,
      }
    })

    let action:any = null

    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      concurrency: 'FIRST',
      concurrencyFilter: _action => {
        action = _action
        return ''
      },
      consequence: () => {},
    })

    store.myAction('id')
    

    expect(action).toEqual({
      type: 'test/myAction',
      meta: ['id'],
      payload: 'id'
    })
  })

  it('creates seperate concurrency branches', async () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      state: [],
      actions: {
        myAction: (id:string, filter:string) => state => state,
        otherAction: (id:string) => state => [...state, id],
      }
    })

    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      concurrency: 'FIRST',
      concurrencyFilter: action => action.meta[1],
      consequence: async({store, action}) => {
        await wait(10)
        store.otherAction(action.payload)
      },
    })

    store.myAction('first a', 'a')
    store.myAction('second a', 'a')
    store.myAction('first b', 'b')
    store.myAction('second b', 'b')
    await wait(20)

    expect(store.getState()).toEqual(['first a', 'first b'])
  })
})