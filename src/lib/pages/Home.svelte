<script>
  import { spring } from 'svelte/motion';

  const boxProps = spring(
    { width: 5, height: 5 },
    { stiffness: 0.1, damping: 0.3 }, // To control the 'spring' specs of the store
  );
</script>

<h2>Home</h2>

<button
  on:click={() => {
    boxProps.set(
      {
        width: Math.random() * 20,
        height: Math.random() * 20,
      },
      { soft: 2 }, // Will ignore the default timing and utilize this in seconds. If the key is 'hard', it will become a writable store (no animation)
    );
  }}>Random box</button
>

<div
  style="transform-origin: 0 0; width:{$boxProps.width}rem; height:{$boxProps.height}rem; transform: scale({$boxProps}); background-color: rebeccapurple"
></div>
