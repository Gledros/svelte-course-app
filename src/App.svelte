<svelte:options immutable={true} />

<script>
  import { onMount } from 'svelte';
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css';

  onMount(() => {
    tippy('.tooltip', {
      content: 'tooltip content',
    });
    tippy(button, {
      content: 'text',
    });
  });

  let button;
</script>

<div>
  <button class="tooltip"> Button </button>
  <button class="tooltip" data-tippy-content="some other text"> Button </button>
  <button bind:this={button}> Button </button>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>
