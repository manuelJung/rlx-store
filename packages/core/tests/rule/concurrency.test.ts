import setupTest from "../setup-test"

describe('rule -> concurrency', () => {
  const wait = (ms:number) => new Promise(r => setTimeout(r, ms))

  it('FIRST: does not allow an rule execution when one is currently running', async () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      state: [],
      actions: {
        myAction: (id:string) => state => state,
        otherAction: (id:string) => state => [...state, id],
      }
    })

    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      concurrency: 'FIRST',
      consequence: async({store, action}) => {
        await wait(10)
        store.actions.otherAction(action.payload)
      },
    })

    store.actions.myAction('first')
    store.actions.myAction('second')
    await wait(20)

    expect(store.getState()).toEqual(['first'])
  })

  it('LAST: cancles previous rule executions when rule executes', async () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      state: [],
      actions: {
        myAction: (id:string) => state => state,
        otherAction: (id:string) => state => [...state, id],
      }
    })

    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      concurrency: 'LAST',
      consequence: async({store, action}) => {
        await wait(10)
        store.actions.otherAction(action.payload)
      },
    })

    store.actions.myAction('first')
    store.actions.myAction('second')
    await wait(20)
    store.actions.myAction('third')
    store.actions.myAction('fourth')
    await wait(20)

    expect(store.getState()).toEqual(['second', 'fourth'])
  })

  it('ONCE: cancles all subsequent calls', async () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      state: [],
      actions: {
        myAction: (id:string) => state => state,
        otherAction: (id:string) => state => [...state, id],
      }
    })

    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      concurrency: 'ONCE',
      consequence: ({store, action}) => {
        store.actions.otherAction(action.payload)
      },
    })

    store.actions.myAction('first')
    store.actions.myAction('second')
    await wait(10)
    store.actions.myAction('third')
    store.actions.myAction('fourth')

    expect(store.getState()).toEqual(['first'])
  })

  it('SWITCH: cancles all past executions when an execution finishes', async () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      state: [],
      actions: {
        myAction: (id:string, ms:number) => state => state,
        otherAction: (id:string) => state => [...state, id],
      }
    })

    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      concurrency: 'SWITCH',
      consequence: async ({store, action}) => {
        await wait(action.meta[1])
        store.actions.otherAction(action.payload)
      },
    })

    store.actions.myAction('first', 20)
    store.actions.myAction('second', 10)
    store.actions.myAction('third', 30)
    store.actions.myAction('fourth', 40)

    await wait(50)

    expect(store.getState()).toEqual(['second', 'third', 'fourth'])
  })
})