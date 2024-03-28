<script lang="ts">
  import createProductStore from "$lib/stores/products"

  export let name:string

  const productsStore = createProductStore(name)

  const hits = productsStore.useState(state => state.data)
</script>

<div class='ProductSlider'>
  {#each $hits as hit}
    <div class="product">
      <h2>{hit.name}</h2>
      <p>{hit.price}€</p>
    </div>
  {/each}
</div>


<style>
  .ProductSlider {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .product {
    width: 200px;
    border: 1px solid #ccc;
    padding: 1rem;
  }
</style>