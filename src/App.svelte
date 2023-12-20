<script>
  import Button from './lib/Button.svelte';

  let buttonProps = {
    size: 'big',
    shadow: true,
  };
</script>

<Button {...buttonProps}>something</Button>

<!-- If it's empty inside the Button tags it uses the default string -->
<Button shadow={true}></Button>
<Button size="small" />
