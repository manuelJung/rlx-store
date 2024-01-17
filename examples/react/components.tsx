import * as React from 'react'
import createSalutationStore from '../stores/salutationList2'

export function SalutationList () {
  const store = createSalutationStore()
  const [filterKey, setFilterKey] = React.useState('color')
  // const mr = store.useSalutation('123')
  const list = store.useState() // updates everytime state changes
  const isFetching1 = store.useState(state => state.isFetching) // shallow equal
  const isFetching2 = store.useState(state => state.isFetching, state => [state.isFetching]) // updater

  const listing = useListingStore()

  const filter = listing.useState(state => ({
    value: state.filterValues.facets[filterKey],
    options: state.filterOptions.facets[filterKey].map(color => ({
      value: color,
      selected: state.filterValues.facets[color].includes(color)
    }))
  }),
  state => [state.filterValues.facets[filterKey], state.filterOptions.facets[filterKey]]
  )

  if(list.isFetching) return <div>loading...</div>

  if(list.fetchError) return <div>Error: {list.fetchError}</div>

  return (
    <div>
      <h2>Salutations</h2>
      {list.data.map(item => <div key={item.id}>{item.label}</div>)}
    </div>
  )
}