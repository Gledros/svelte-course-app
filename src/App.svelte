<svelte:options immutable={true} />

<script>
  import longpress from './lib/actions/longpress';

  let showButton = true;
  let duration = 3000;
</script>

<div>
  <label for="show">
    <input bind:checked={showButton} id="show" type="checkbox" />
    Toggle
  </label>

  <label for="range">
    <input
      type="range"
      id="range"
      bind:value={duration}
      max={4000}
      min={2000}
      step={10}
    />
    {duration}ms
  </label>

  {#if showButton}
    <button use:longpress={{ duration }}> Click </button>
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>
