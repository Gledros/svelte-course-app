<script context="module">
  let videoPlayers = new Set();
</script>

<script>
  import { onDestroy, onMount } from 'svelte';

  export let src = undefined;

  let paused = true,
    player;

  onMount(() => {
    videoPlayers.add(player);
  });

  // @ts-ignore
  const pause = () => (paused = true);

  onDestroy(() => {
    videoPlayers.delete(player);
  });
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
  bind:this={player}
  on:play={() => {
    videoPlayers.forEach((currentPlayer) => {
      if (player !== currentPlayer) currentPlayer.pause();
    });
  }}
  class:playing={!paused}
  {src}
  controls
  muted
  bind:paused
/>

<style>
  video.playing {
    outline: 0.25rem solid orange;
  }
</style>
