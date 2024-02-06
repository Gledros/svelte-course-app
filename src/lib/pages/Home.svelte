<script>
  import Button from '../Button.svelte';
  import { Form, Field } from '../Form';
  import { validateRequiredField, validateEmail } from '../utils/validation';
</script>

<h2>Home</h2>

<Form
  on:submit={(event) => {
    console.log(event.detail);
  }}
  initialValues={{ username: 'Test', email: 'test@test.com' }}
  let:hasErrors
>
  <Field
    name="username"
    label="username"
    placeholder="John Doe"
    validate={validateRequiredField}
  >
    <p slot="error" let:error>{error}</p>
  </Field>
  <Field
    name="email"
    label="email"
    type="email"
    placeholder="john@doe.com"
    validate={(value, label) => {
      return validateRequiredField(value, label) || validateEmail(value, label);
    }}
  />
  <Field
    name="password"
    label="password"
    type="password"
    validate={validateRequiredField}
  />
  <div>
    <Button type="submit" disabled={hasErrors}>Submit</Button>
  </div>
</Form>

<style>
  div {
    grid-column-end: span 2;
    display: flex;
    justify-content: center;
  }

  p {
    text-align: left;
    color: orange;
    margin: 0;
    font-weight: bold;
  }
</style>
