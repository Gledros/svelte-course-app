<script>
  let count = 0;

  let string;

  $: if (count > 5) string = `You have clicked ${count}`;
  $: if (count == 0) string = 'You have clicked less than 5';

  const increment = () => count++;
  const reset = () => (count = 0);
</script>

<button on:click={increment}>Clicks {count}</button>
<h3>{string}</h3>
<button on:click={reset}>Reset count</button>
