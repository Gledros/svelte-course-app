<script>
  import Counter from './lib/Counter.svelte';

  let name = 'Svelte';

  const maxCount = 6;
</script>

<h1>Hello {name.toLocaleLowerCase()}!</h1>

<Counter initialCount={3} {maxCount} />

<style>
  h1 {
    color: red;
  }
</style>
