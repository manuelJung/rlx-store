const createStore:any = null

type Config = {
  campaignId: string
  name: string
  creative: string
}

export default function createEecTrackingStore (config:Config) {
  const store = createStore({
    name: 'eecTracking',
    key: config.campaignId,
    state:config,
    actions: {
      click: () => state => {
        pushUA({ name: 'click-1' })
        pushUA({ name: 'click-2' })
      },
      view: () => state => {
        pushUA({ name: 'view' })
      },
    }
  })

  return store
}

function pushUA (event:any) {
  return null
}