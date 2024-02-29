<script>
  import Button from '../Button.svelte';
  import Layer from '../konva/Layer.svelte';
  import Rect from '../konva/Rect.svelte';
  import Stage from '../konva/Stage.svelte';

  let showCanvas = true;
  let x = 20;
  let width = 300;
  let rect1, rect2;
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
<Button
  on:click={() => {
    console.log('rect1', rect1.rect.getAttrs());
    console.log('rect2', rect2.rect.getAttrs());
    console.log('rect2', rect2.rect.getStage());
    rect2.rect.x(100);
  }}
>
  Get rect info
</Button>

<Stage {width} height={350}>
  {#if showCanvas}
    <Layer
      draggable
      on:dragmove={(event) => console.log('dragged', event)}
      on:click={(event) => console.log('clicked', event)}
    >
      <Rect
        {x}
        bind:this={rect1}
        y={20}
        fill="blue"
        width={100}
        height={100}
        stroke={undefined}
        strokeWidth={4}
        on:click={(event) => console.log('blue clicked')}
        on:mousedown={(event) => console.log('blue mousedown')}
      />
      <Rect
        x={40}
        y={40}
        fill="green"
        width={100}
        height={100}
        stroke={undefined}
        strokeWidth={4}
        on:click={(event) => console.log('green clicked')}
        on:mousedown={(event) => console.log('green mousedown')}
      />
    </Layer>
  {/if}
  <Layer {x}>
    <Rect
      bind:this={rect2}
      x={60}
      y={60}
      fill="orange"
      width={100}
      height={100}
      stroke="purple"
      strokeWidth={3}
      on:click={(event) => console.log('orange clicked')}
      on:mousedown={(event) => console.log('orange mousedown')}
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
