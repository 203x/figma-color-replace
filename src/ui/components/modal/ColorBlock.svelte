<script>
  export let color

  let val = '#' + color

  const handleChange = () => {
    color = val.substring(1)
  }

  $: if (color) {
    val = '#' + color
  }
</script>

<style>
  .color {
    display: block;
    width: 1.5em;
    height: 1.5em;
    border-radius: 1px;
    background-color: #fff;
  }
</style>

<input class="color" type="color" bind:value={val} on:change={handleChange} />
