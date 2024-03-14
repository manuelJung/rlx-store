<script lang="ts">
  import createTodoStore from "../stores/todos";

  const todoStore = createTodoStore()
  const todos = todoStore.useState(state => state.data)

  let newTodo = ""
</script>


<h2>Add Todo</h2>

<form on:submit|preventDefault={() => todoStore.actions.add(newTodo)}>
  <input bind:value={newTodo} />
  <button type="submit">Add</button>
</form>

<hr/>

{#each $todos as todo}
  <div>
    <input
      type="checkbox"
      checked={todo.completed}
      on:change={() => todoStore.actions.toggle(todo.id)}
    />
    <span>{todo.text}</span>
    <button on:click={() => todoStore.actions.remove(todo.id)}>Remove</button>
  </div>
  {#if todo.completed}
    <em>Completed</em>
  {/if}
  
{/each}