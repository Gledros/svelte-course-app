<script>
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  const size = tweened(
    { width: 5, height: 5 },
    {
      duration: 1000,
      easing: cubicOut,
    },
  );
</script>

<h2>Home</h2>

<button
  on:click={async () => {
    await size.set({
      width: Math.random() * 20,
      height: Math.random() * 20,
    });

    console.log('done'); // Only gets executed when the promise gets resolved; if it gets cancelled/interrupted it does not execute
  }}>Random size</button
>

<div
  style="width:{$size.width}rem;height:{$size.height}rem;transform: scale({$size})"
></div>

<style>
  div {
    background-color: rebeccapurple;
    transform-origin: 0 0;
  }
</style>
