<svelte:options immutable={true} />

<script>
  import { onMount, tick } from 'svelte';
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
  let isAdding = false;
  let todosBeingDeleted = [];
  let todosBeingToggled = [];

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

  const handleAddTodo = async (event) => {
    event.preventDefault();
    isAdding = true;

    await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({ title: event.detail.value, completed: false }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(async (response) => {
      if (response.ok) {
        const todo = await response.json();

        todos = [...todos, { ...todo, id: uuid() }];
      } else error = 'An error has ocurred';
    });

    isAdding = false;

    await tick;
    todoList.clearInput();
    todoList.focusInput();
  };

  const clearTodos = () => (todos = []);

  const removeTodo = async ({ detail }) => {
    const id = detail.id;

    if (todosBeingDeleted.includes(id)) return;

    todosBeingDeleted = [...todosBeingDeleted, id];

    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    }).then(async (response) => {
      if (response.ok) {
        todos = todos.filter((todo) => todo.id !== id);
      } else error = 'An error has ocurred';
    });

    todosBeingDeleted = todosBeingDeleted.filter((todo) => {
      if (todo !== id) return todo;
    });
  };

  const toggleTodo = async ({ detail }) => {
    const id = detail.id;

    if (todosBeingToggled.includes(id)) return;

    todosBeingToggled = [...todosBeingToggled, id];

    await fetch(`https://jsonplaceholder.typicode.com/todos/${detail.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: detail.completed }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(async (response) => {
      if (response.ok) {
        todos = todos.map((todo) => {
          if (todo.id === detail.id)
            return {
              ...todo,
              completed: detail.completed,
            };
          return todo;
        });
      } else error = 'An error has ocurred';
    });

    todosBeingToggled = todosBeingDeleted.filter((todo) => {
      if (todo !== id) return todo;
    });
  };
</script>

<div>
  {#if displayList}
    <TodoList
      {todos}
      {error}
      {isLoading}
      {isAdding}
      {todosBeingDeleted}
      {todosBeingToggled}
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
