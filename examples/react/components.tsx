import * as React from 'react'
import createSalutationStore from '../stores/salutationList2'

export function SalutationList () {
  const store = createSalutationStore()
  const mr = store.useSalutation('123')
  const list = store.useState() // updates everytime state changes
  const isFetching1 = store.useState(state => state.isFetching) // shallow equal
  const isFetching2 = store.useState(state => state.isFetching, state => [state.isFetching]) // updater

  if(list.isFetching) return <div>loading...</div>

  if(list.fetchError) return <div>Error: {list.fetchError}</div>

  return (
    <div>
      <h2>Salutations</h2>
      {list.data.map(item => <div key={item.id}>{item.label}</div>)}
    </div>
  )
}