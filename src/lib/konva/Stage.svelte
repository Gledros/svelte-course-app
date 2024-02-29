<script>
  import Konva from 'konva';
  import { onDestroy, onMount, setContext } from 'svelte';
  import { stageKey } from './context-keys';

  export let width, height;
  export let backgroundColor = 'white';

  let container, stage;

  setContext(stageKey, { getStage: () => stage });

  onMount(() => {
    stage = new Konva.Stage({
      container,
      width,
      height,
      ...$$props,
    });
  });

  $: if (stage) stage.setAttrs($$props);

  onDestroy(() => {
    if (stage) stage.destroy();
  });
</script>

<div style:background-color={backgroundColor} bind:this={container}>
  {#if stage}
    <slot />
  {/if}
</div>
