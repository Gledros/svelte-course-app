<script>
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { interpolateRgb } from 'd3-interpolate';

  const boxProps = tweened(
    { width: 5, height: 5, color: 'rebeccapurple' },
    {
      duration: 1000,
      easing: cubicOut,
      interpolate: (a, b) => (t) => {
        const deltaWidth = b.width - a.width;
        const deltaHeight = b.height - a.height;
        const color = interpolateRgb(a.color, b.color)(t);

        return {
          width: a.width + deltaWidth * t,
          height: a.height + deltaHeight * t,
          color,
        };
      },
    },
  );
</script>

<h2>Home</h2>

<button
  on:click={async () => {
    await boxProps.set({
      width: Math.random() * 20,
      height: Math.random() * 20,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });

    console.log('done'); // Only gets executed when the promise gets resolved; if it gets cancelled/interrupted it does not execute
  }}>Random box</button
>

<div
  style="transform-origin: 0 0; width:{$boxProps.width}rem; height:{$boxProps.height}rem; transform: scale({$boxProps}); background-color:{$boxProps.color}"
></div>
