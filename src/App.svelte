<script>
  import Counter from './lib/Counter.svelte';

  let name = 'Svelte';

  const props = {
    maxCount: 8,
    initialCount: 3,
  };
</script>

<h1>Hello {name.toLocaleLowerCase()}!</h1>

<Counter {...props} x={150} />

<style>
  h1 {
    color: red;
  }
</style>
