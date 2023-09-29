import setupTest from "../setup-test"

describe('rule -> store.key', () => {
  it('creates separate concurrency branches for each individual store', () => {
    const cb = jest.fn()
    function createStore (key:string) {
      const c = setupTest()
      const store = c.createStore({
        name: 'test',
        key,
        state: [],
        actions: {
          myAction: (id:string, filter:string) => state => state,
        }
      })
  
      store.addRule({
        id: 'effect',
        target: 'test/myAction',
        concurrency: 'ONCE',
        consequence: ({action}) => cb(key, action.payload),
      })
  
      return store
    }

    const store1 = createStore('first')
    const store2 = createStore('second')

    store1.myAction('a')
    store1.myAction('b')
    store2.myAction('a')
    store2.myAction('b')

    expect(cb).toBeCalledTimes(2)
    expect(cb).toBeCalledWith('first', 'a')
    expect(cb).toBeCalledWith('second', 'a')
  })
})