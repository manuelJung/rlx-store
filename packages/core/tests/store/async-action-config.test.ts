import setupTest from "../setup-test"

describe('store -> async action config', () => {
  it('triggers /request and /success action when action was called successfull', async () => {
    const c = setupTest()
    const fetcher = jest.fn(async () => 'result')
    const store = c.createStore({
      name: 'my-name',
      state: {data:null},
      actions: {
        increment: (n:number) => ({ fetcher })
      }
    })

    const result = await store.increment(1)

    expect(result).toBe(true)

    expect(c.managers.rule.dispatch).toBeCalledWith(
      expect.objectContaining({
        type: 'my-name/increment/request', 
        meta: [1], 
        payload: undefined, 
      }),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    expect(c.managers.rule.dispatch).toBeCalledWith(
      {
        type: 'my-name/increment/success', 
        meta: ['result', 1],
        payload: 'result',
      },
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    expect(store.getState()).toEqual({ data: 'result' })
  })

  it('triggers /request and /failure action when action call failed', async () => {
    const c = setupTest()
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
      expect.objectContaining({
        type: 'my-name/increment/request', 
        meta: [], 
        payload: undefined, 
      }),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    expect(c.managers.rule.dispatch).toBeCalledWith(
      {type: 'my-name/increment/failure', meta: [error], payload: error},
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )

    expect(store.getState()).toEqual({ fetchError: error })
  })

  it('can override update-targets with mappings', async () => {
    const c = setupTest()
    const fetcher = jest.fn(async () => 'result')
    const store = c.createStore({
      name: 'my-name',
      state: {dataNew:null, isFetchingNew: false},
      actions: {
        increment: () => ({
          mappings: { data: 'dataNew', isFetching: 'isFetchingNew' },
          fetcher
        })
      }
    })

    const promise = store.increment()

    expect(store.getState().isFetchingNew).toBe(true)
    expect(store.getState().dataNew).toBe(null)

    const result = await promise

    expect(result).toBe(true)
    expect(store.getState().isFetchingNew).toBe(false)
    expect(store.getState().dataNew).toBe('result')
  })

  it('can map response manually to state', async () => {
    const c = setupTest()
    const fetcher = jest.fn(async () => 'result')
    const store = c.createStore({
      name: 'my-name',
      state: {data:null, dataCopy: null},
      actions: {
        increment: () => ({
          mapResponse: (r,s) => ({...s, data: r, dataCopy: r}),
          fetcher
        })
      }
    })

    const result = await store.increment()

    expect(result).toBe(true)
    expect(store.getState().data).toBe('result')
    expect(store.getState().dataCopy).toBe('result')
  })

  it('can optimistic update state', async () => {
    const c = setupTest()
    const fetcher = jest.fn(async () => 'result')
    const store = c.createStore({
      name: 'my-name',
      state: {data:null},
      actions: {
        increment: () => ({
          fetcher,
          optimisticData: () => 'optimistic'
        })
      }
    })

    const request = store.increment()

    expect(store.getState().data).toBe('optimistic')

    await request

    expect(store.getState().data).toBe('result')
  })

  it('rollbacks optimistic data after request failure', async () => {
    const c = setupTest()
    const error = new Error('my-error')
    const fetcher = jest.fn(async () => {throw error})
    const store = c.createStore({
      name: 'my-name',
      state: {data:'initial'},
      actions: {
        increment: () => ({
          fetcher,
          optimisticData: () => 'optimistic'
        })
      }
    })

    const request = store.increment()

    expect(store.getState().data).toBe('optimistic')

    await request

    expect(store.getState().data).toBe('initial')
  })
})