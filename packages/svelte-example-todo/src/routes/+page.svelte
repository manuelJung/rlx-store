<script lang="ts">
  import createCounterStore from "../stores/counter";
  import createTodoStore from "../stores/todos";

  const todoStore = createTodoStore()
  const todos = todoStore.useState(state => state.data)

  const counterStore = createCounterStore()
  const count = counterStore.useState(state => state.count)

  let newTodo = ""
</script>

<button on:click={counterStore.actions.increment}>Counter: {$count}</button>


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