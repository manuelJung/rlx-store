import setupTest from "../setup-test"

describe('store -> async action config', () => {
  it('triggers /request and /success action when action was called', async () => {
    const c = setupTest({preventAutoMount:true})
    const fetcher = jest.fn(async () => 'result')
    const store = c.createStore({
      name: 'my-name',
      actions: {
        increment: () => ({ fetcher })
      }
    })

    const result = await store.increment()

    expect(result).toBe(true)

    expect(c.managers.rule.dispatch).toBeCalledWith(
      {type: 'my-name/increment/request', meta: [], payload: null},
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    expect(c.managers.rule.dispatch).toBeCalledWith(
      {type: 'my-name/increment/success', meta: [], payload: 'result2'},
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
  })
})