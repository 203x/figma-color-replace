<script lang="ts">
  export let color: string
  export let lightness: boolean = false

  let val: string = '#' + color

  $: val = '#' + color

  const handleChange = () => {
    color = val.substring(1)
  }
</script>

<input
  class="color"
  class:lightness
  type="color"
  bind:value={val}
  on:change={handleChange}
/>

<style lang="scss">
  .color {
    display: block;
    width: 1.5em;
    height: 1.5em;
    border-radius: 1px;
    background-color: #fff;
    border: none;
    &.lightness {
      border: 0.5px solid rgb(0 0 0 / 10%);
    }
  }
</style>
