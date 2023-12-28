<svelte:options immutable={true} />

<script>
  import TodoList from './lib/TodoList.svelte';
  import { v4 as uuid } from 'uuid';

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

  $: console.log(todos);

  const handleAddTodo = (event) => {
    todos = [
      ...todos,
      { id: uuid(), title: event.detail.value, completed: false },
    ];
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

<TodoList
  {todos}
  on:addTodo={handleAddTodo}
  on:clearTodos={clearTodos}
  on:removeTodo={removeTodo}
  on:toggleTodo={toggleTodo}
/>
