<script>
  // @ts-ignore
  import FaLightbulb from 'svelte-icons/fa/FaLightbulb.svelte';
  import settings from '../stores/settings';
</script>

<h2>Settings</h2>

<button on:click={() => settings.toggleColorScheme()}>
  <FaLightbulb />
  <p>{$settings.colorScheme} theme</p>
</button>

<button on:click={() => settings.updateSetting('language', Math.random())}>
  <p>Update language</p>
</button>

<button on:click={() => settings.reset()}>
  <p>Reset settings</p>
</button>

{$settings.colorScheme}
<br />
{$settings.language}

<style>
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
