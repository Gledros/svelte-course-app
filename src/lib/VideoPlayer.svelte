<script>
  import Button from './Button.svelte';

  export let src = undefined;

  let paused = true,
    currentTime = 0,
    volume = 0;
</script>

<div>
  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    class:playing={!paused}
    {src}
    controls
    muted
    bind:paused
    bind:volume
    bind:currentTime
  />

  <span>
    <Button
      on:click={() => {
        paused = !paused;
      }}
    >
      {paused ? 'Play' : 'Pause'}
    </Button>

    <p>{currentTime.toFixed(2)}</p>
    <p>{(volume * 100).toFixed(0)}</p>
  </span>
</div>

<style>
  div {
    display: flex;
  }

  span {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  video.playing {
    outline: 0.25rem solid orange;
  }
</style>
