<script>
  export let todos;
</script>

<ul>
  {#each todos as todo, index (todo.id)}
    <li>{index + 1} > {todo.title}</li>
  {/each}
</ul>

<style>
  li {
    list-style-type: none;
  }
</style>
