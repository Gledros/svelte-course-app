<script>
  import Button from '../Button.svelte';
  import VideoPlayer, { playAll, pauseAll } from '../VideoPlayer.svelte';
</script>

<h2>Home</h2>

<Button on:click={playAll}>Play All</Button>
<Button on:click={pauseAll}>Pause All</Button>

<VideoPlayer src="mov_bbb.mp4" />
<VideoPlayer src="mov_bbb.mp4" />
<VideoPlayer src="mov_bbb.mp4" />

<style lang="scss">
</style>
