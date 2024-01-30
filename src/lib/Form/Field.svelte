<script>
  import { getContext } from 'svelte';
  import { v4 as uuid } from 'uuid';
  import formKey from './form-key';

  export let name;
  export let label = undefined;
  export let placeholder = label;
  export let type = 'text';
  export let validate = undefined;

  const formStore = getContext(formKey);

  const id = uuid();
</script>

{#if label}
  <label for={id}>{label}:</label>
{/if}
<input
  {type}
  {name}
  {id}
  {placeholder}
  value={$formStore.values[name] || ''}
  on:input={(event) => ($formStore.values[name] = event.currentTarget.value)}
/>

<style>
  label {
    width: 100%;
    text-align: end;
  }
</style>
