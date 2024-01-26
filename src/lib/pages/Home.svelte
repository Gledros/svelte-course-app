<script>
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  const size = tweened(1, {
    duration: 200,
    easing: cubicOut,
  });
</script>

<h2>Home</h2>

<button on:click={() => ($size += 0.5)}>Bigger</button>
<button on:click={() => ($size -= 0.5)}>Smaller</button>

<div style="transform: scale({$size})"></div>

<style>
  div {
    width: 5rem;
    height: 5rem;
    background-color: rebeccapurple;
    transform-origin: 0 0;
  }
</style>
