import setupTest from "../setup-test"

describe('store -> async action config', () => {
  it('triggers /request and /success action when action was called successfull', async () => {
    const c = setupTest({preventAutoMount:true})
    const fetcher = jest.fn(async () => 'result')
    const store = c.createStore({
      name: 'my-name',
      state: {data:null},
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
      {type: 'my-name/increment/success', meta: [], payload: 'result'},
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    expect(store.getState()).toEqual({ data: 'result' })
  })

  it('triggers /request and /failure action when action call failed', async () => {
    const c = setupTest({preventAutoMount:true})
    const error = new Error('my-error')
    const fetcher = jest.fn(async () => {throw error})
    const store = c.createStore({
      name: 'my-name',
      state: {fetchError:null},
      actions: {
        increment: () => ({ fetcher })
      }
    })

    const result = await store.increment()

    expect(result).toBe(false)

    expect(c.managers.rule.dispatch).toBeCalledWith(
      {type: 'my-name/increment/request', meta: [], payload: null},
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    expect(c.managers.rule.dispatch).toBeCalledWith(
      {type: 'my-name/increment/failure', meta: [], payload: error},
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    expect(store.getState()).toEqual({ fetchError: error })
  })
})