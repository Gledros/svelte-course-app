<script>
  export let size = 'normal';
  export let shadow = false;
  export let bgColor = 'inherit';
  export let textColor = 'inherit';
</script>

<button
  style:--buttonBgColor={bgColor}
  style:--buttonTextColor={textColor}
  class:size-small={size === 'small'}
  class:size-big={size === 'big'}
  class:shadow
>
  <slot>Hey, listen!</slot></button
>

<style lang="scss">
  button {
    border: none;
    background-color: var(--buttonBgColor);
    color: var(--buttonTextColor);
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
