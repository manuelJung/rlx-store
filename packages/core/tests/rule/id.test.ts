import setupTest from "../setup-test"

describe('rule -> id', () => {
  it('acts as id for rule-db', () => {
    const c = setupTest()

    const store = c.createStore({name: 'my-name', key: 'foo'})
    store.addRule({id: 'rule-id-', consequence: ()=>{}, target: ''})

    expect(c.managers.rule.db.has('rule-id-my-name'))
  })

  it('is propagated to rule-container', () => {
    const c = setupTest()

    const store = c.createStore({name: 'my-name'})
    store.addRule({id: 'rule-id', consequence: ()=>{}, target: ''})

    const container = c.managers.rule.db.get('rule-idmy-name')
    expect(container?.id).toBe('rule-id')
  })

  it('creates a totally new rule (-container) instance when value changes', () => {
    const c = setupTest()

    const store = c.createStore({name: 'my-name'})
    store.addRule({id: 'rule-id-2-', consequence: ()=>{}, target: ''})
    store.addRule({id: 'rule-id-1-', consequence: ()=>{}, target: ''})

    expect(c.managers.rule.db.has('rule-id-1-my-name'))
    expect(c.managers.rule.db.has('rule-id-2-my-name'))
  })

  it('prevents reinitialisation when called multiple times with same id', () => {
    const c = setupTest()

    const store = c.createStore({name: 'my-name'})
    store.addRule({id: 'rule-id', consequence: ()=>{}, target: ''})

    expect(c.managers.events.trigger).toBeCalledTimes(2)

    store.addRule({id: 'rule-id', consequence: ()=>{}, target: ''})

    expect(c.managers.events.trigger).toBeCalledTimes(2)
  })
})