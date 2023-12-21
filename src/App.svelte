<script>
  import Button from './lib/Button.svelte';
  import FaAngellist from 'svelte-icons/fa/FaAngellist.svelte';

  let buttonProps = {
    size: 'big',
    shadow: true,
  };
</script>

<Button {...buttonProps}>
  <div style:width="2rem" slot="leftContent"><FaAngellist /></div>
  something
</Button>
