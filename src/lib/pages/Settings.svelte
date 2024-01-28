<script>
  // @ts-ignore
  import FaLightbulb from 'svelte-icons/fa/FaLightbulb.svelte';
  import settings from '../stores/settings';
  import direction from '../stores/direction';
</script>

<h2>Settings</h2>

<div>
  <button on:click={() => settings.toggleColorScheme()}>
    <FaLightbulb />
    <p>{$settings.colorScheme} theme</p>
  </button>

  <button on:click={() => settings.reset()}>
    <p>Reset settings</p>
  </button>

  <select name="language" id="language" bind:value={$settings.language}>
    <option value="en" selected>English</option>
    <option value="ar">Arabic</option>
  </select>
</div>

<div>
  <p>{$direction}</p>
  <p>{$settings.colorScheme}</p>
  <p>{$settings.language}</p>
</div>

<style>
  div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  select {
    padding: 0.5rem;
  }

  button {
    display: flex;
    background: none;
    border: 2px solid var(--textColor);
    padding: 0.75rem;
    height: 3.5rem;
    color: var(--textColor);
    align-items: center;
  }

  p {
    text-align: left;
    font-weight: bold;
  }
</style>
