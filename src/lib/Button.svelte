<script>
  export let size = 'normal';
  export let shadow = false;
</script>

<button
  class:size-small={size === 'small'}
  class:size-big={size === 'big'}
  class:shadow
>
  <slot>Hey, listen!</slot></button
>

<style lang="scss">
  button {
    border: none;
    background-color: variables.$color_primary;
    color: whitesmoke;
    font-weight: bold;
    padding: 0.5rem 1.5rem;

    transition:
      background-color 1.5s ease,
      color 0.5s ease;

    &.size-small {
      padding: 0.25rem 0.75rem;
    }

    &.size-big {
      padding: 1rem 3rem;
    }

    &.shadow {
      box-shadow: 0 0 0.5rem rgba(1, 1, 1, 1);
    }

    &:hover {
      background-color: variables.$color_secondary;
      color: black;
    }
  }
</style>
