<script context="module">
  let videoPlayers = new Set();

  export function playAll() {
    videoPlayers.forEach((currentPlayer) => currentPlayer.play());
  }

  export function pauseAll() {
    videoPlayers.forEach((currentPlayer) => currentPlayer.pause());
  }
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
  // @ts-ignore
  const play = () => (paused = false);

  onDestroy(() => {
    videoPlayers.delete(player);
  });
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
  bind:this={player}
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
