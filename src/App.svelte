<svelte:options immutable={true} />

<script>
  import tippy from './lib/actions/tippy';

  let content = 'some string';
</script>

<div>
  <input type="text" bind:value={content} />
  <button use:tippy={{ content, placement: 'right' }}> Button </button>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>
