<script>
  import Konva from 'konva';
  import { getContext } from 'svelte';
  import { layerKey } from './context-keys';

  export let x, y, fill, width, height, stroke, strokeWidth;

  const layer = getContext(layerKey);

  const rect = new Konva.Rect({
    x,
    y,
    width,
    height,
    fill,
    stroke,
    strokeWidth,
  });

  layer.add(rect);
</script>
