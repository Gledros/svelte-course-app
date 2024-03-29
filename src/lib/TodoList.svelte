<script>
  import Button from './Button.svelte';
  import { createEventDispatcher, afterUpdate } from 'svelte';
  // @ts-ignore
  import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';
  import { flip } from 'svelte/animate';
  import { crossfade, scale } from 'svelte/transition';

  afterUpdate(() => {
    if (scrollOnAdd) {
      const direction = scrollOnAdd === 'top' ? 0 : listHeight;

      if (autoscroll) listUl.scrollTo({ top: direction, behavior: 'smooth' });

      autoscroll = false;
    }
  });

  export let todos = null;
  export let error = null;
  export let isLoading = null;
  export let isAdding = null;
  export let disabledTodos = null;
  export let scrollOnAdd = undefined;

  export const clearInput = () => (inputText = '');
  export const focusInput = () => input.focus();

  let input, listUl, listHeight;
  let inputText = '';
  let autoscroll = false;
  let previousTodos = todos;

  const [send, receive] = crossfade({
    duration: 500,
    fallback(node) {
      return scale(node, { delay: 300, duration: 300 });
    },
  });

  $: {
    autoscroll = todos?.length > previousTodos?.length;
    previousTodos = todos;
  }

  $: doneList = todos?.filter((todo) => todo.completed) || [];
  $: todoList = todos?.filter((todo) => !todo.completed) || [];

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
    <div class="main-section">
      {#each [todoList, doneList] as list, index}
        <div class="list-section">
          {#if index === 0}
            <h4>Todo</h4>
          {:else}
            <h4>Done</h4>
          {/if}
          <div class="todo-list" bind:this={listUl}>
            <ul bind:offsetHeight={listHeight}>
              {#each list as todo (todo.id)}
                {@const { id, completed, title } = todo}
                <li animate:flip={{ delay: 300, duration: 300 }}>
                  <slot {todo}>
                    <div
                      class:completed
                      in:receive={{ key: id }}
                      out:send={{ key: id }}
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
        </div>
      {/each}
    </div>
  {/if}

  <div class="form-section">
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
    <Button
      on:click={() => dispatch('clearTodos')}
      disabled={todos?.length === 0}>Clear list</Button
    >
  </div>
</div>

<style lang="scss">
  .main-section {
    display: flex;
    gap: 0.5rem;
    height: 20rem;
  }

  .list-section {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .form-section {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .todo-list-wrapper {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #767676;
    border-radius: 2px;
  }

  .todo-list {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    border-top: 1px solid #767676;
    border-bottom: 1px solid #767676;
    padding: 0.5rem 0;
    width: 100%;
  }

  form {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
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
    margin-top: 0.5rem;
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
    opacity: 0.8;
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
    width: 100%;
  }
</style>
