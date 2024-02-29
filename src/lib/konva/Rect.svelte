<script>
  import Konva from 'konva';
  import { getContext, onDestroy } from 'svelte';
  import { layerKey } from './context-keys';

  export let x, y, fill, width, height, stroke, strokeWidth;

  const layer = getContext(layerKey);

  const rect = new Konva.Rect($$props);

  layer.add(rect);

  $: rect.setAttrs({ x, y, width, height, fill, stroke, strokeWidth });

  onDestroy(() => {
    rect.destroy();
  });
</script>
