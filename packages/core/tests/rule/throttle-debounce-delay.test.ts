import setupTest from "../setup-test"

describe('rule -> throttle, debounce, delay', () => {
  const wait = (ms:number) => new Promise(r => setTimeout(r, ms))

  it('DELAY: delays the execution of each consequence', async () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      actions: { myAction: () => state => state }
    })

    const consequence = jest.fn()

    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      delay: 10,
      consequence,
    })

    store.myAction()
    store.myAction()
    expect(consequence).toBeCalledTimes(0)

    await wait(20)
    expect(consequence).toBeCalledTimes(2)
  })

  it.skip('THROTTLE: calls latest consequence after X ms', async () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      state: [],
      actions: {
        myAction: (id:number) => state => state,
        otherAction: (id:number) => state => [...state, id],
      }
    })

    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      throttle: 30,
      consequence: ({store, action}) => {
        store.otherAction(action.payload)
      },
    })

    store.myAction(1) // 0
    await wait(10)  
    store.myAction(2) // 10
    await wait(10)
    store.myAction(3) // 20
    await wait(20)
    store.myAction(4) // 40
    await wait(50)  // 90

    expect(store.getState()).toEqual([3,4])
  })

  it('DEBOUNCE: calls latest consequence after last call happened X ms', async () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'test',
      state: [],
      actions: {
        myAction: (id:number) => state => state,
        otherAction: (id:number) => state => [...state, id],
      }
    })

    store.addRule({
      id: 'effect',
      target: 'test/myAction',
      debounce: 30,
      consequence: ({store, action}) => {
        store.otherAction(action.payload)
      },
    })

    store.myAction(1) // 0
    await wait(10)  
    store.myAction(2) // 10
    await wait(10)
    store.myAction(3) // 20
    await wait(50)
    store.myAction(4) // 70
    await wait(50)  // 120

    expect(store.getState()).toEqual([3,4])
  })
})