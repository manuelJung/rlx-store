<script lang="ts">
  import createProductStore from "$lib/stores/products"

  export let name:string

  const productsStore = createProductStore(name)

  const hits = productsStore.useState(state => state.data)
</script>

{#each $hits as hit}
  <div class="product">
    <h2>{hit.name}</h2>
    <p>{hit.price}€</p>
  </div>
{/each}

<style>
  .product {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem;
  }
</style>