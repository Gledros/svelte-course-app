<svelte:options immutable={true} />

<script>
  import { onMount } from 'svelte';
  import Button from './lib/Button.svelte';
  import TodoList from './lib/TodoList.svelte';
  import { v4 as uuid } from 'uuid';

  onMount(() => {
    loadTodos();
  });

  let todoList;
  let displayList = true;

  let todos = null;
  let error = null;
  let isLoading = false;

  const loadTodos = () => {
    isLoading = true;

    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(
      async (response) => {
        if (response.ok) todos = await response.json();
        else error = 'An error has ocurred';
      },
    );

    isLoading = false;
  };

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
    <TodoList
      {todos}
      {error}
      {isLoading}
      bind:this={todoList}
      on:addTodo={handleAddTodo}
      on:clearTodos={clearTodos}
      on:removeTodo={removeTodo}
      on:toggleTodo={toggleTodo}
    />
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
