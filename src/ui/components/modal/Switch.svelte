<script>
  export let checked = false

  $: toggle = checked ? 'toggleOn' : 'toggleOff'

  const toggleSwitch = () => {
    checked = !checked
  }
</script>

<style>
  .switch {
    position: relative;
    width: 24px;
    height: 12px;
    border-radius: 12px;
    box-sizing: border-box;
    border: 1px solid #333;
  }
  .toggle {
    position: absolute;
    top: -1px;
    border: 1px solid #333;
    height: 12px;
    width: 12px;
    border-radius: 100%;
    background: #fff;
    box-sizing: border-box;
    transition: all 0.1s ease-out;
  }
  .toggleOff .toggle {
    left: -1px;
  }
  .toggleOn .toggle {
    left: calc(100% - 12px + 1px);
  }
  .toggleOn {
    background: #333;
  }
</style>

<div on:click={toggleSwitch} class="switch {toggle}">
  <div class="toggle" />
</div>
