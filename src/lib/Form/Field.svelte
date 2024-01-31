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

  const handleInput = (event) => {
    const value = event.currentTarget.value;

    if (validate && validate(value))
      $formStore.errors[name] = validate(value, label);
    else delete $formStore.errors[name];

    $formStore.values[name] = value;
  };
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
  on:input={handleInput}
/>
{#if $formStore.errors[name]}
  <span />
  <p class="error">{$formStore.errors[name]}</p>
{/if}

<style>
  label {
    width: 100%;
    text-align: end;
  }

  input {
    max-width: 10rem;
  }

  p {
    text-align: left;
  }

  .error {
    margin: 0 0;
    color: red;
    font-weight: bold;
  }
</style>
