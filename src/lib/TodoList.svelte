<script>
  import Button from './Button.svelte';
  import { createEventDispatcher } from 'svelte';

  export let todos = [];

  let inputText = '';

  const dispatch = createEventDispatcher();

  const handleAddTodo = () => {
    const dispatched = dispatch(
      'addTodo',
      { value: inputText },
      { cancelable: true },
    );

    if (dispatched) inputText = '';
  };

  const handleRemoveTodo = (id) => dispatch('removeTodo', { id: id });
</script>

<div class="todo-list-wrapper">
  {#if todos.length === 0}
    <p>This list looks empty</p>
  {:else}
    <ul>
      {#each todos as { id, title, completed } (id)}
        <li>
          <label for={title}>
            <input
              on:input={(event) => {
                event.currentTarget.checked = completed;
                dispatch('toggleTodo', {
                  id: id,
                  completed: !completed,
                });
              }}
              type="checkbox"
              checked={completed}
            />
            {title}
          </label>
          <Button on:click={() => handleRemoveTodo(id)}>Remove</Button>
        </li>
      {/each}
    </ul>
  {/if}

  <form
    class="add-todo-form"
    action=""
    on:submit|preventDefault={handleAddTodo}
  >
    <input type="text" bind:value={inputText} />
    <Button type="submit" disabled={!inputText}>Add</Button>
  </form>
  <Button on:click={() => dispatch('clearTodos')} disabled={todos.length === 0}
    >Clear list</Button
  >
</div>

<style>
  .todo-list-wrapper {
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #767676;
    border-radius: 2px;
  }

  input {
    text-align: center;
    padding: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  li {
    display: flex;
    justify-content: space-between;
  }
</style>
