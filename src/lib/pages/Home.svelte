<script>
  import Button, { getTotalButtons } from '../Button.svelte';

  let showButton = false;
  let total = 0;
</script>

<h2>Home</h2>

<label for="showButtonCheckbox">
  <input id="showButtonCheckbox" type="checkbox" bind:checked={showButton} />
  Show Button
</label>

<Button>Button</Button>
<Button>Button</Button>

{#if showButton}
  <Button>Button</Button>
{/if}

<Button
  on:click={() => {
    total = getTotalButtons();
  }}>Update count : {total}</Button
>

<style lang="scss">
  label {
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      cursor: pointer;
      color: variables.$color_primary;
    }
  }

  [type='checkbox']:hover {
    cursor: pointer;
  }
</style>
