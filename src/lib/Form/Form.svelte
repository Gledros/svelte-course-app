<script>
  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import formKey from './form-key';
  import Button from '../Button.svelte';

  export let initialValues = {};
  const form = writable({ values: initialValues, errors: {} });

  const dispatch = createEventDispatcher();

  setContext(formKey, form);
</script>

<form on:submit|preventDefault={() => dispatch('submit', $form.values)}>
  <slot />
  <span />
  <Button type="submit">Submit</Button>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    justify-items: center;
  }
</style>
