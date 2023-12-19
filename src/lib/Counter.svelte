<script>
  export let initialCount = 0;
  export let maxCount = 100;

  let count1 = initialCount;
  let count2 = 0;

  let string = 'Count2 is 0';

  const setCount2 = (value) => (count2 = value);

  /*
    The order of the reactive statements it's important. Reversing the following
    two lines makes the assignment of 'string' variable unaccounted for.
  */
  $: setCount2(count1);
  $: string = `Count2 is ${count2}`;

  const increment1 = () => {
    if (count1 < maxCount) count1 += 1;
  };
  const reset = () => (count1 = count2 = 0);
</script>

<button on:click={increment1}>Clicks {count1}</button>
<h3>{string}</h3>
<button on:click={reset}>Reset count</button>
