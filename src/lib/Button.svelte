<script>
</script>

<button><slot>Hey, listen!</slot></button>

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

    &:hover {
      background-color: variables.$color_secondary;
      color: black;
    }
  }
</style>
