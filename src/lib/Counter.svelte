<script>
  let count1 = 0;
  let count2 = 0;

  let string;

  /*
    According to course instructor using the functions wouldn't work for
    reactive statements unless they got the states inside them, but using both
    kind of functions work as expected
  */
  const getTotalCount = () => count1 + count2;
  function getTotalCount2() {
    return count1 + count2;
  }

  $: if (count1 + count2 > 5) string = `The count total is ${getTotalCount()}`;
  $: if (count1 + count2 == 0) string = 'The count total is less than 5';

  const increment1 = () => (count1 += 1);
  const increment2 = () => (count2 += 1);
  const reset = () => (count1 = count2 = 0);
</script>

<button on:click={increment1}>Clicks {count1}</button>
<button on:click={increment2}>Clicks {count2}</button>
<h3>{string}</h3>
<button on:click={reset}>Reset count</button>
