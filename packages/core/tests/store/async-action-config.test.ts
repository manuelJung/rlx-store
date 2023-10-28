import setupTest from "../setup-test"

describe('store -> async action config', () => {
  it('triggers /request and /success action when action was called', async () => {
    const c = setupTest({preventAutoMount:true})
    const fetcher = jest.fn(async () => 'result')
    c.createStore({
      name: 'my-name',
      actions: {
        increment: () => ({ fetcher })
      }
    })
  })
})