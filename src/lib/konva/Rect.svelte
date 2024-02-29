<script>
  import Konva from 'konva';
  import { createEventDispatcher, getContext, onDestroy } from 'svelte';
  import { layerKey } from './context-keys';

  export let x, y, fill, width, height, stroke, strokeWidth;

  export const rect = new Konva.Rect($$props);

  const layer = getContext(layerKey);

  const dispatch = createEventDispatcher();

  layer.on('click mousedown', (event) => {
    dispatch(event.type, event);
  });

  layer.add(rect);

  $: rect.setAttrs({ x, y, width, height, fill, stroke, strokeWidth });

  onDestroy(() => {
    rect.destroy();
  });
</script>
