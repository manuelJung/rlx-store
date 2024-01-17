import createAccountStore from "./account"

const createStore:any = null

export type Channel = 'b2c' | 'b2b'

export default function createChannelStore () {
  const account = createAccountStore()
  const store = createStore({
    name: 'channel',
    state: () => account.getState().user?.channel ?? 'b2b' as Channel,
    actions: {
      set: (channel:Channel) => () => channel,
    }
  })

  store.addRule({
    name: 'updateOnLogin',
    target: ['account/initialFetchSuccess', 'account/loginSuccess'],
    output: '/set',
    condition: ({action}) => action.payload,
    consequence: ({store, action}) => store.actions.set(action.payload!.channel),
  })

  return store
}