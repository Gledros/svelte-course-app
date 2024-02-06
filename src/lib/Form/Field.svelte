<script>
  import { getContext, onMount } from 'svelte';
  import { v4 as uuid } from 'uuid';
  import formKey from './form-key';

  export let name;
  export let label = undefined;
  export let placeholder = label;
  export let type = 'text';
  export let validate = undefined;

  onMount(() => {
    const value = $formStore.values[name];

    if (validate && validate(value))
      $formStore.errors[name] = validate(value, label);
  });

  let inputHandled = false;

  const formStore = getContext(formKey);
  const id = uuid();

  const handleInput = (event) => {
    const value = event.currentTarget.value;

    if (validate && validate(value))
      $formStore.errors[name] = validate(value, label);
    else delete $formStore.errors[name];

    $formStore.values[name] = value;
    if (!inputHandled) inputHandled = true;
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
{#if $formStore.errors[name] && inputHandled}
  <span />
  <slot name="error" error={$formStore.errors[name]}>
    <p class="error">{$formStore.errors[name]}</p>
  </slot>
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
