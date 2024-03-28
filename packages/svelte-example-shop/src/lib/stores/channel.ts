import createStore from "@rlx/svelte";

export type Channel = 'b2b' | 'b2c'

export default function createChannelStore() {
  const store = createStore({
    name: 'channel',
    persist: true,
    state: {
      data: 'b2b' as Channel
    },
    actions: {
      set: (channel: Channel) => state => ({data:channel})
    }
  })

  store.addRule({
    id: 'log-set',
    target: ['account/login/success', 'account/initialFetch/success'],
    consequence: ({store}) => store.actions.set('b2b')
  })

  return store
}