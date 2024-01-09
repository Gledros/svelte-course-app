<script>
  import Button from './Button.svelte';
  import { createEventDispatcher, afterUpdate } from 'svelte';
  // @ts-ignore
  import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';

  afterUpdate(() => {
    if (autoscroll) listUl.scrollTo({ top: 0, behavior: 'smooth' });
    autoscroll = false;
  });

  export let todos = null;
  export let error = null;
  export let isLoading = null;
  export let isAdding = null;
  export let disabledTodos = null;

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
    <div class="todo-list">
      <p>Loading list...</p>
    </div>
  {:else if error}
    <div class="todo-list">
      <p>{error}</p>
    </div>
  {:else if todos?.length === 0 || !todos}
    <div class="todo-list">
      <p>This list looks empty</p>
    </div>
  {:else if todos}
    <div class="todo-list" bind:this={listUl}>
      <ul bind:offsetHeight={listHeight}>
        {#each todos as todo (todo.id)}
          {@const { id, completed, title } = todo}
          <li animate:flip={{ delay: 300, duration: 300 }}>
            <slot {todo}>
              <div
                class:completed
                in:fly={{ x: -200, duration: 750 }}
                out:fly={{ x: 200, duration: 750 }}
              >
                <label for={id}>
                  <input
                    {id}
                    disabled={disabledTodos.includes(id)}
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
                  disabled={disabledTodos.includes(id)}
                  aria-label="Remove Todo: {title}"
                  title="Remove Todo"
                  on:click={() => handleRemoveTodo(id)}
                  size="small"
                >
                  <FaRegTrashAlt slot="icon" />
                </Button>
              </div>
            </slot>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <form on:submit|preventDefault={handleAddTodo}>
    <input
      disabled={isAdding}
      placeholder="New Todo"
      name="todo-item"
      bind:this={input}
      type="text"
      bind:value={inputText}
    />
    <Button type="submit" disabled={!inputText || isAdding}>Add</Button>
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
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #767676;
    border-radius: 2px;
    min-width: 20rem;
    max-width: 24rem;
    height: 26rem;
  }

  .todo-list {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    border-bottom: 1px solid #767676;
    padding-bottom: 0.5rem;
    width: 100%;
  }

  form {
    display: flex;
    // justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #767676;
    border-radius: 2px;
    // width: 100%;

    input {
      text-align: center;
      padding: 0.5rem;
      color: #ffffff;
      font-weight: bold;
      background-color: #b9b9b9;
      border: 1px solid #767676;
      border-radius: 2px;

      &:disabled {
        cursor: not-allowed;
      }
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
    margin-bottom: 0.5rem;
  }

  .todo-list::-webkit-scrollbar-thumb {
    background-color: var(--buttonBgColor);
    border-radius: 0.4rem;
    border: 3px solid var(--buttonBgColor);
  }

  li > div {
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
    width: 100%;
  }
</style>
