<script lang="ts">
  import createTodoStore from "../stores/todos";
  import { onDestroy, onMount } from "svelte";

  const todos = createTodoStore()
  const state = todos.useState()

  let newTodo = ""
</script>


<h2>Add Todo</h2>

<form on:submit|preventDefault={() => todos.actions.add(newTodo)}>
  <input bind:value={newTodo} />
  <button type="submit">Add</button>
</form>

<hr/>

{#each $state.data as todo}
  <div>
    <input
      type="checkbox"
      checked={todo.completed}
      on:change={() => todos.actions.toggle(todo.id)}
    />
    <span>{todo.text}</span>
    <button on:click={() => todos.actions.remove(todo.id)}>Remove</button>
  </div>
  {#if todo.completed}
    <em>Completed</em>
  {/if}
  
{/each}