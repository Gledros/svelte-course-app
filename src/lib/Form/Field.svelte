<script>
  import { getContext } from 'svelte';
  import { v4 as uuid } from 'uuid';

  export let name;
  export let label = undefined;
  export let placeholder = label;
  export let type = 'text';
  export let validate = undefined;

  const { values } = getContext('form');

  const id = uuid();
</script>

{#if label}
  <label for={id}>{label}:</label>
{/if}
<input {type} {name} {id} {placeholder} value={values[name] || ''} />

<style>
  label {
    width: 100%;
    text-align: end;
  }
</style>
