import * as React from 'react'
import salutationStore from '../stores/saluationList'

export function SalutationList () {
  const store = salutationStore()
  const list = store.useState()

  if(list.isFetching) return <div>loading...</div>

  if(list.fetchError) return <div>Error: {list.fetchError}</div>

  return (
    <div>
      <h2>Salutations</h2>
      {list.list.map(item => <div key={item.id}>{item.label}</div>)}
    </div>
  )
}