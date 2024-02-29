<script>
  import Konva from 'konva';
  import { getContext, onDestroy, setContext } from 'svelte';
  import { stageKey, layerKey } from './context-keys';

  export let draggable = false;

  const { getStage } = getContext(stageKey);

  const layer = new Konva.Layer({
    ...$$props,
    draggable,
  });

  setContext(layerKey, layer);

  const stage = getStage();

  stage.add(layer);

  $: layer.setAttrs($$props);

  onDestroy(() => {
    layer.destroy();
  });
</script>

<slot />
