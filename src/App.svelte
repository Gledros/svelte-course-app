<svelte:options immutable={true} />

<script>
  import Button from './lib/Button.svelte';
  import TodoList from './lib/TodoList.svelte';
  import { v4 as uuid } from 'uuid';
  import { tick } from 'svelte';

  let todoList;
  let displayList = true;

  let todos = [
    {
      id: uuid(),
      title: 'Todo 1',
      completed: false,
    },
    {
      id: uuid(),
      title: 'Todo 2',
      completed: true,
    },
    {
      id: uuid(),
      title: 'Todo 3',
      completed: true,
    },
  ];

  const handleAddTodo = async (event) => {
    event.preventDefault();
    console.log(document.querySelectorAll('.todo-list ul li'));
    todos = [
      ...todos,
      { id: uuid(), title: event.detail.value, completed: false },
    ];
    await tick();
    console.log(document.querySelectorAll('.todo-list ul li'));

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
