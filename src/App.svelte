<script>
  import Button from './lib/Button.svelte';
  import FaCloudSun from 'svelte-icons/fa/FaCloudSun.svelte';
  import FaCloudSunRain from 'svelte-icons/fa/FaCloudSunRain.svelte';

  let buttonProps = {
    size: 'big',
    shadow: true,
  };
</script>

<!--
  Slot props work at the level that are specified, if they are put on a named
  slot it will work only inside that part of the parent component. If they are
  specified in the default slot they will work only on the parent component but
  outside the other named slots (Don't know if it's a bug, but it's not working
  as expected according to the svelte course).
-->
<Button {...buttonProps} on:click|once={() => alert(true)}>
  <div style:width="2rem" slot="leftContent" let:isLeftHovered>
    {#if !isLeftHovered}
      <FaCloudSun />
    {:else}
      <FaCloudSunRain />
    {/if}
  </div>
  weather forecast
</Button>
