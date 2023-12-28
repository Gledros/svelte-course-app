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
      completed: false,
    },
    {
      id: uuid(),
      title: 'Todo 3',
      completed: false,
    },
    {
      id: uuid(),
      title: 'Todo 4',
      completed: false,
    },
  ];

  $: console.log(todos.length);
</script>

<TodoList bind:todos />
