<script>
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

<Form
  on:submit={(event) => {
    console.log(event.detail);
  }}
  initialValues={{ username: 'Test', email: 'test@test.com' }}
>
  <Field name="username" label="username" placeholder="John Doe" {validate} />
  <Field
    name="email"
    label="email"
    type="email"
    placeholder="john@doe.com"
    {validate}
  />
  <Field name="password" label="password" type="password" {validate} />
  <Field name="password2" label="password 2" type="password" {validate} />
</Form>
