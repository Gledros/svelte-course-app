<svelte:options immutable={true} />

<script>
  import { onMount } from 'svelte';
  import Home from './lib/pages/Home.svelte';
  import Settings from './lib/pages/Settings.svelte';
  import Head from './lib/Head.svelte';

  onMount(onRouteChange);

  let page = '';

  function onRouteChange() {
    const path = window.location.hash.slice(1);

    if (path === '/') page = 'home';
    else if (path === '/settings') page = 'settings';
    else window.location.hash = '/';
  }
</script>

<svelte:window on:hashchange={onRouteChange} />
<Head />

<nav>
  <a href="#/">Home</a>
  <a href="#/settings">Settings</a>
</nav>

<div>
  {#if page === 'home'}
    <Home />
  {:else if page === 'settings'}
    <Settings />
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>
