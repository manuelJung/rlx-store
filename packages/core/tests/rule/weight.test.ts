import setupTest from "../setup-test"

describe('rule -> weight', () => {
  it('can define rule execution order when two rules have a weight', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      actions: { foo: () => state => state }
    })
    const list:string[] = []
    store.addRule({
      id: 'rule-1', 
      target: 'my-name/foo',
      weight: 2, 
      consequence: () => list.push('a'), 
    })
    store.addRule({
      id: 'rule-2',
      weight: 1,
      consequence: () => list.push('b'),
      target: 'my-name/foo',
    })

    store.actions.foo()
    expect(list).toEqual(['b', 'a'])
  })

  it('always executes after rules without weight', () => {
    const c = setupTest()
    const store = c.createStore({
      name: 'my-name',
      actions: { foo: () => state => state }
    })
    const list:string[] = []
    store.addRule({
      id: 'rule-1', 
      target: 'my-name/foo',
      weight: 1,
      consequence: () => list.push('a'), 
    })
    store.addRule({
      id: 'rule-2',
      consequence: () => list.push('b'),
      target: 'my-name/foo',
    })

    store.actions.foo()
    expect(list).toEqual(['b', 'a'])
  })
})