<svelte:options immutable={true} />

<script>
  import Button from './lib/Button.svelte';
  import TodoList from './lib/TodoList.svelte';
  import { v4 as uuid } from 'uuid';

  let todoList;
  let displayList = true;

  let todos = [];

  const loadTodos = () => {
    return fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(
      (response) => {
        if (response.ok) return response.json();
        else throw new Error('An error has ocurred');
      },
    );
  };

  let promise = loadTodos();

  const handleAddTodo = (event) => {
    todos = [
      ...todos,
      { id: uuid(), title: event.detail.value, completed: false },
    ];

    todoList.clearInput();
    todoList.focusInput();
  };

  const clearTodos = () => (todos = []);

  const removeTodo = ({ detail }) =>
    (todos = todos.filter((todo) => todo.id !== detail.id));

  const toggleTodo = (event) => {
    todos = todos.map((todo) => {
      if (todo.id === event.detail.id)
        return {
          ...todo,
          completed: event.detail.completed,
        };
      return todo;
    });
  };
</script>

<div>
  {#if displayList}
    {#await promise}
      <p>Fetching data...</p>
    {:then todos}
      <TodoList
        {todos}
        bind:this={todoList}
        on:addTodo={handleAddTodo}
        on:clearTodos={clearTodos}
        on:removeTodo={removeTodo}
        on:toggleTodo={toggleTodo}
      />
    {:catch error}
      <p>{error.message || 'An error has ocurred'}</p>
    {/await}
    <Button
      on:click={() => {
        promise = loadTodos();
      }}>Refresh data</Button
    >
  {/if}

  <Button on:click={() => (displayList = !displayList)}>
    {#if displayList}
      Hide
    {:else}
      Show
    {/if}
    list
  </Button>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
