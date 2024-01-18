<script>
  import settings from './stores/settings';
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />
  {#if $settings.colorScheme === 'dark'}
    <style>
      :root {
        --backgroundColor: rgb(0, 0, 0);
        --textColor: #fff;
      }
    </style>
  {:else}
    <style>
      :root {
        --backgroundColor: #fff;
        --textColor: rgb(0, 0, 0);
      }
    </style>
  {/if}
</svelte:head>
