<script>
  export let size = 'normal';
  export let shadow = false;
  export let bgColor = 'inherit';
  export let textColor = 'inherit';

  let isLeftHovered = false;
</script>

<button
  on:click
  {...$$restProps}
  style:--buttonBgColor={bgColor}
  style:--buttonTextColor={textColor}
  class:size-small={size === 'small'}
  class:size-big={size === 'big'}
  class:shadow
  class:has-left={$$slots.leftContent}
>
  {#if $$slots.leftContent}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="left-content"
      on:mouseenter={() => (isLeftHovered = true)}
      on:mouseleave={() => (isLeftHovered = false)}
    >
      <slot name="leftContent" {isLeftHovered} />
    </div>
  {/if}
  {#if $$slots.icon}
    <span class="icon-{size}">
      <slot name="icon" />
    </span>
  {:else}
    <slot><p class="missing">Missing text</p></slot>
  {/if}
</button>

<style lang="scss">
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: var(--buttonBgColor);
    color: var(--buttonTextColor);
    font-weight: bold;
    padding: 0.5rem 1.5rem;

    transition:
      background-color 0.25s ease,
      color 0.25s ease;

    .left-content {
      margin-right: 0.5rem;
      height: 1.5rem;
      width: 1.5rem;
    }

    &:disabled {
      background-color: rgb(48, 48, 48);
      color: rgb(236, 233, 233);
      opacity: 0.8;
      cursor: not-allowed;
    }

    &.size-small {
      padding: 0.25rem 0.75rem;
    }

    &.size-big {
      padding: 1rem 3rem;
    }

    &.shadow {
      box-shadow: 0 0 0.5rem rgba(1, 1, 1, 1);
    }

    &:hover:enabled {
      background-color: variables.$color_secondary;
      color: variables.$color_primary;
    }

    .icon-normal {
      width: 1.5rem;
      height: 1.5rem;
    }

    .icon-small {
      width: 1rem;
      height: 1rem;
    }

    .icon-big {
      width: 2rem;
      height: 2rem;
    }
  }

  p.missing {
    color: rgb(0, 0, 0);
  }
</style>
