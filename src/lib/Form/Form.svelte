<script>
  import { setContext } from 'svelte';
  export let initialValues = {};

  setContext('form', { values: initialValues, errors: {} });
</script>

<form>
  <slot />
</form>

<style>
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    justify-items: center;
  }
</style>
