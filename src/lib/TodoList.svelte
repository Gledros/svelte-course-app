<script>
  import Button from './Button.svelte';
  import { createEventDispatcher, afterUpdate } from 'svelte';
  import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';

  afterUpdate(() => {
    if (autoscroll) listUl.scrollTo(0, listHeight);
    autoscroll = false;
  });

  export let todos = null;
  export let error = null;
  export let isLoading = null;

  export const clearInput = () => (inputText = '');
  export const focusInput = () => input.focus();

  let input, listUl, listHeight;
  let inputText = '';
  let autoscroll = false;
  let previousTodos = todos;

  $: {
    autoscroll = todos?.length > previousTodos?.length;
    previousTodos = todos;
  }

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
  <h4>Todo List</h4>
  {#if isLoading}
    <p>Loading list...</p>
  {:else if error}
    <p>{error}</p>
  {:else if todos?.length === 0 || !todos}
    <p>This list looks empty</p>
  {:else if todos}
    <div class="todo-list" bind:this={listUl}>
      <ul bind:offsetHeight={listHeight}>
        {#each todos as { id, title, completed } (id)}
          <li class:completed>
            <label for={id}>
              <input
                {id}
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
            <Button
              aria-label="Remove Todo: {title}"
              title="Remove Todo"
              on:click={() => handleRemoveTodo(id)}
              size="small"
            >
              <FaRegTrashAlt slot="icon" />
            </Button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <form
    class="add-todo-form"
    action=""
    on:submit|preventDefault={handleAddTodo}
  >
    <input
      placeholder="New Todo"
      name="todo-item"
      bind:this={input}
      type="text"
      bind:value={inputText}
    />
    <Button type="submit" disabled={!inputText}>Add</Button>
  </form>
  <Button on:click={() => dispatch('clearTodos')} disabled={todos?.length === 0}
    >Clear list</Button
  >
</div>

<style lang="scss">
  .todo-list-wrapper {
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #767676;
    border-radius: 2px;
  }

  .todo-list {
    max-height: 15rem;
    max-width: 20rem;
    overflow: auto;
  }

  form {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #767676;
    border-radius: 2px;

    input {
      text-align: center;
      padding: 0.5rem;
      color: #ffffff;
      font-weight: bold;
      background-color: #b9b9b9;
      border: 1px solid #767676;
      border-radius: 2px;
    }

    ::placeholder {
      color: rgb(255, 255, 255);
    }
  }

  input[type='checkbox'] {
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0 0.5rem;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  .todo-list::-webkit-scrollbar {
    width: 0.75rem;
  }

  .todo-list::-webkit-scrollbar-track {
    background: rgb(225, 225, 225);
    border-radius: 0.4rem;
  }

  .todo-list::-webkit-scrollbar-thumb {
    background-color: var(--buttonBgColor);
    border-radius: 0.4rem;
    border: 3px solid var(--buttonBgColor);
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 0.5rem;
    border-bottom: 1px solid #767676;
  }

  li:first-of-type {
    border-top: 1px solid #767676;
  }

  .completed {
    background-color: rgb(222, 222, 222);
  }

  .completed label {
    text-decoration: line-through;
  }

  label {
    display: flex;
    gap: 0.5rem;
    text-align: left;
    align-items: baseline;
    cursor: pointer;
    user-select: none;
  }

  h4 {
    margin: 0;
    padding: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #767676;
  }
</style>
