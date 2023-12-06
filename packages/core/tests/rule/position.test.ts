import setupTest from "../setup-test"

describe('rule -> position', () => {
  it('position AFTER executes consequence after store update', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      state: 0,
      actions: { foo: () => () => 1 }
    })
    store.addRule({
      id: 'foo',
      position: 'AFTER',
      target: 'my-name/foo',
      consequence: () => {
        expect(store.getState()).toBe(1)
      }
    })

    expect(store.getState()).toBe(0)
    store.actions.foo()
    expect(store.getState()).toBe(1)
  })

  it('position BEFORE executes consequence before store update', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      state: 0,
      actions: { foo: () => () => 1 }
    })
    store.addRule({
      id: 'foo',
      position: 'BEFORE',
      target: 'my-name/foo',
      consequence: () => {
        expect(store.getState()).toBe(0)
      }
    })

    expect(store.getState()).toBe(0)
    store.actions.foo()
    expect(store.getState()).toBe(1)
  })

  it('position INSTEAD prevents store update', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      state: 0,
      actions: { foo: () => () => 1 }
    })
    store.addRule({
      id: 'foo',
      position: 'INSTEAD',
      target: 'my-name/foo',
      consequence: () => {
        expect(store.getState()).toBe(0)
      }
    })

    expect(store.getState()).toBe(0)
    store.actions.foo()
    expect(store.getState()).toBe(0)
  })
})