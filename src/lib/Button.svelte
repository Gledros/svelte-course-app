<script>
</script>

<button><slot>Hey, listen!</slot></button>

<style lang="scss">
  button {
    border: none;
    background-color: #008000;
    color: whitesmoke;
    font-weight: bold;
    padding: 0.5rem 1.5rem;

    transition:
      background-color 1.5s ease,
      color 0.25s ease;

    &:hover {
      background-color: #19cd19;
      color: black;
    }
  }
</style>
