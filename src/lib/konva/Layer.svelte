<script>
  import Konva from 'konva';
  import {
    createEventDispatcher,
    getContext,
    onDestroy,
    setContext,
  } from 'svelte';
  import { stageKey, layerKey } from './context-keys';

  export let draggable = false;

  const { getStage } = getContext(stageKey);
  const dispatch = createEventDispatcher();

  const layer = new Konva.Layer({
    ...$$props,
    draggable,
  });

  layer.on('dragmove click mousedown', (event) => {
    dispatch(event.type, event);
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
