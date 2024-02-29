<script>
  import Layer from '../konva/Layer.svelte';
  import Rect from '../konva/Rect.svelte';
  import Stage from '../konva/Stage.svelte';

  let showCanvas = true;
  let x = 20;
  let width = 300;
</script>

<h2>Home</h2>

<label for="showCanvas"
  ><input id="showCanvas" type="checkbox" bind:checked={showCanvas} /> Display canvas</label
>
<label for="rectXRange"
  ><input type="range" bind:value={x} min={0} max={300} /> X value</label
>
<label for="stageWidth"
  ><input type="range" bind:value={width} min={100} max={600} /> Width value</label
>

<Stage {width} height={350}>
  {#if showCanvas}
    <Layer draggable>
      <Rect
        {x}
        y={20}
        fill="blue"
        width={100}
        height={100}
        stroke={undefined}
        strokeWidth={4}
      />
      <Rect
        x={40}
        y={40}
        fill="green"
        width={100}
        height={100}
        stroke={undefined}
        strokeWidth={4}
      />
    </Layer>
  {/if}
  <Layer {x}>
    <Rect
      x={60}
      y={60}
      fill="orange"
      width={100}
      height={100}
      stroke="purple"
      strokeWidth={3}
    />
  </Layer>
</Stage>

<style lang="scss">
  label {
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: variables.$color_primary;
    }
  }
</style>
