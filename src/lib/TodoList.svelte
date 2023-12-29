<script>
  import Button from './Button.svelte';
  import {
    createEventDispatcher,
    onDestroy,
    onMount,
    beforeUpdate,
    afterUpdate,
  } from 'svelte';

  afterUpdate(() => {
    if (autoscroll) listUl.scrollTo(0, listHeight); //listUl.scrollHeight);
    autoscroll = false;
  });

  export let todos = [];

  export const clearInput = () => (inputText = '');
  export const focusInput = () => input.focus();

  let input, listUl, listHeight;
  let inputText = '';
  let autoscroll = false;
  let previousTodos = todos;

  $: {
    autoscroll = todos.length > previousTodos.length;
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
  {#if todos.length === 0}
    <p>This list looks empty</p>
  {:else}
    <div class="todo-list" bind:this={listUl}>
      <ul bind:offsetHeight={listHeight}>
        {#each todos as { id, title, completed } (id)}
          <li>
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
            <Button on:click={() => handleRemoveTodo(id)}>Remove</Button>
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
      name="todo-item"
      bind:this={input}
      type="text"
      bind:value={inputText}
    />
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

  .todo-list {
    max-height: 15rem;
    max-width: 20rem;
    overflow: auto;
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
    padding: 0 0.5rem;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .todo-list::-webkit-scrollbar {
    width: 0.75rem; /* width of the entire scrollbar */
  }

  .todo-list::-webkit-scrollbar-track {
    background: rgb(225, 225, 225); /* color of the tracking area */
    border-radius: 0.4rem;
  }

  .todo-list::-webkit-scrollbar-thumb {
    background-color: var(--buttonBgColor); /* color of the scroll thumb */
    border-radius: 0.4rem; /* roundness of the scroll thumb */
    border: 3px solid var(--buttonBgColor); /*rgb(122, 121, 117); /* creates padding around scroll thumb */
  }

  li {
    display: flex;

    justify-content: space-between;
    gap: 0.5rem;
  }
</style>
