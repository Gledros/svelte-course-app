<script>
  import { onDestroy } from 'svelte';
  import settings from '../stores/settings';

  let colorScheme;

  const unsubscribe = settings.subscribe((settings) => {
    colorScheme = settings.colorScheme;
  });

  $: settings.update((prevSettings) => ({ ...prevSettings, colorScheme }));

  onDestroy(unsubscribe);
</script>

<h2>Settings</h2>

{colorScheme}

<form>
  <label for="radio1">
    <input
      type="radio"
      id="radio1"
      name="colorScheme"
      value="dark"
      bind:group={colorScheme}
    /> Dark
  </label>
  <label for="radio2">
    <input
      type="radio"
      id="radio2"
      name="colorScheme"
      value="light"
      bind:group={colorScheme}
    /> Light
  </label>
</form>

<style>
  form {
    border: 1px solid black;
    border-radius: 0.25rem;
    padding: 1rem;
  }
</style>
