<script>
  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import formKey from './form-key';
  import Button from '../Button.svelte';

  export let initialValues = {};
  const formStore = writable({
    values: initialValues,
    errors: {},
    showErrors: false,
  });

  const dispatch = createEventDispatcher();

  setContext(formKey, formStore);

  const handleSubmit = (_) => {
    if (Object.keys($formStore.errors).length === 0) {
      dispatch('submit', $formStore.values);
      $formStore.showErrors = false;
    } else $formStore.showErrors = true;
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <slot />
  </div>
  <Button type="submit">Submit</Button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
</style>
