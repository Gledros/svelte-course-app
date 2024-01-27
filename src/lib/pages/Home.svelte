<script>
  import Button from '../Button.svelte';
  import { Form, Field } from '../Form';
  let values = { username: '', email: '', password: '' };

  let isSubmitting = false;
  let errors = {};

  function validate() {
    const errors = {};
    if (!values.username) errors.username = 'The username is required';
    if (!values.email) errors.email = 'The email is required';
    if (!values.password) errors.password = 'The password is required';

    if (
      values.email &&
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)
    ) {
      errors.email = 'The email is invalid';
    }

    return errors;
  }
</script>

<h2>Home</h2>

{#if errors.length > 0}
  <p>{errors.username}</p>
{/if}

<form
  on:submit|preventDefault={() => {
    errors = validate();

    if (Object.keys(errors).length > 0) return;

    isSubmitting = true;

    setTimeout(() => {
      isSubmitting = false;
    }, 1000);
  }}
>
  <label for="username">username:</label>
  <input
    type="text"
    id="username"
    name="username"
    bind:value={values.username}
  />
  <label for="email">email:</label>
  <input type="email" id="email" name="email" bind:value={values.email} />
  <label for="password">password:</label>
  <input
    type="password"
    id="password"
    name="password"
    bind:value={values.password}
  />
  <span />
  <Button size="small" disabled={isSubmitting}>Submit</Button>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    justify-items: center;
  }

  label {
    width: 100%;
    text-align: end;
  }
</style>
