const createStore:any = null

type Event =
| { event: 'pageview' }

export default function trackingStore () {
  const store = createStore({
    name: 'tracking',
    state: null,
    actions: {
      sendEvent: (event:Event) => () => {
        sendEvent(event)
        return null
      }
    }
  })

  return store
}

function sendEvent (event:Event) {}