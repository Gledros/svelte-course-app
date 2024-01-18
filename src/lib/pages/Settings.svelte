<script>
  import settings from '../stores/settings';
</script>

<h2>Settings</h2>

{$settings.colorScheme}

<button
  on:click={() => {
    $settings.colorScheme =
      $settings.colorScheme === 'light' ? 'dark' : 'light';
  }}>Toggle Color Scheme</button
>

<form>
  <label for="radio1">
    <input
      type="radio"
      id="radio1"
      value="dark"
      bind:group={$settings.colorScheme}
    /> Dark
  </label>
  <label for="radio2">
    <input
      type="radio"
      id="radio2"
      value="light"
      bind:group={$settings.colorScheme}
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
