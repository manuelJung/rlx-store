import setupTest from "./setup-test"

describe('effect-config-api', () => {
  describe('id', () => {
    it('acts as id for effect-db', () => {
      const c = setupTest()

      const store = c.createStore({name: 'my-name', key: 'foo'})
      store.addRule({id: 'rule-id-', consequence: ()=>{}, target: ''})

      expect(c.managers.rule.db.has('rule-id-my-name'))
    })

    it('is propagated to effect-container', () => {
      const c = setupTest()

      const store = c.createStore({name: 'my-name'})
      store.addRule({id: 'rule-id', consequence: ()=>{}, target: ''})

      const container = c.managers.rule.db.get('rule-idmy-name')
      expect(container?.id).toBe('rule-id')
    })

    it('creates a totally new effect (-container) instance when value changes', () => {
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

  describe('target', () => {
    it('triggers rule execution for single action', () => {
      const c = setupTest()

      const store = c.createStore({
        name: 'my-name',
        actions: {
          action1: () => state => state,
        }
      })

      const consequence = jest.fn()

      store.addRule({
        id: 'rule-id',
        target: 'my-name/action1',
        consequence,
      })

      store.action1()

      expect(consequence).toBeCalled()
    })

    it('triggers rule execution for multiple actions', () => {
      const c = setupTest()

      const store = c.createStore({
        name: 'my-name',
        actions: {
          action1: () => state => state,
          action2: () => state => state,
        }
      })

      const consequence = jest.fn()

      store.addRule({
        id: 'rule-id',
        target: ['my-name/action1', 'my-name/action2'],
        consequence,
      })

      store.action1()
      expect(consequence).toBeCalledTimes(1)

      store.action2()
      expect(consequence).toBeCalledTimes(2)
    })

    it('autofills store-name', () => {
      const c = setupTest()

      const store = c.createStore({
        name: 'my-name',
        actions: {
          action1: () => state => state,
        }
      })

      const consequence = jest.fn()

      store.addRule({
        id: 'rule-id',
        target: '/action1',
        consequence,
      })

      store.action1()

      expect(consequence).toBeCalled()
    })
  })
})