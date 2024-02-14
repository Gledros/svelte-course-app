<script>
  import { onMount } from 'svelte';
  import Konva from 'konva';

  let container;

  onMount(() => {
    const stage = new Konva.Stage({
      container,
      width: 300,
      height: 350,
    });

    const layer = new Konva.Layer();
    const rect = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 60,
      fill: '#138168',
      strokeWidth: 4,
    });

    const rect2 = new Konva.Rect({
      x: 140,
      y: 20,
      width: 50,
      height: 160,
      fill: 'aqua',
      strokeWidth: 0,
      shadowColor: 'rgba(1,1,1,0.5)',
      shadowBlur: 10,
      cornerRadius: 5,
    });

    layer.add(rect);
    layer.add(rect2);
    stage.add(layer);
  });
</script>

<h2>Home</h2>

<div bind:this={container} />

<style>
  div {
    background-color: white;
  }
</style>
