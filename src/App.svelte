<script>
  import Button from './lib/Button.svelte';
  import FaCloudSun from 'svelte-icons/fa/FaCloudSun.svelte';
  import FaCloudSunRain from 'svelte-icons/fa/FaCloudSunRain.svelte';

  let buttonProps = {
    size: 'big',
    shadow: true,
  };
</script>

<Button {...buttonProps} on:click|once={() => alert(true)} disabled>
  <div style:width="2rem" slot="leftContent" let:isLeftHovered>
    {#if !isLeftHovered}
      <FaCloudSun />
    {:else}
      <FaCloudSunRain />
    {/if}
  </div>
  weather forecast
</Button>
