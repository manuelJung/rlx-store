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
        store.otherAction(action.payload)
      },
    })

    store.myAction('first')
    store.myAction('second')
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
        store.otherAction(action.payload)
      },
    })

    store.myAction('first')
    store.myAction('second')
    await wait(20)
    store.myAction('third')
    store.myAction('fourth')
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
        store.otherAction(action.payload)
      },
    })

    store.myAction('first')
    store.myAction('second')
    await wait(10)
    store.myAction('third')
    store.myAction('fourth')

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
        store.otherAction(action.payload)
      },
    })

    store.myAction('first', 20)
    store.myAction('second', 10)
    store.myAction('third', 30)
    store.myAction('fourth', 40)

    await wait(50)

    expect(store.getState()).toEqual(['second', 'third', 'fourth'])
  })
})