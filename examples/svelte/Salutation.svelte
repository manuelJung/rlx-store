<script lang="ts">
  import salutationListStore from '../stores/saluationList'
  const store = salutationListStore()
  const state = store.useState()
</script>

{#if $state.isFetching}
  <div>loading</div>
{:else if $state.fetchError}
  <div>Error: {$state.fetchError}</div>
{:else}
  <div>
    <h2>Salutations</h2>
    {#each $state.data as salut}
      <div>{salut.label}</div>
    {/each}
  </div>
{/if}