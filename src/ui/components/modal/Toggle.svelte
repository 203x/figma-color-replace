<script>
  export let checked = false

  $: toggle = checked ? 'toggle-on' : 'toggle-off'
</script>

<div class="toggle {toggle}">
  <div class="toggle-nub" />
</div>

<style lang="scss">
  .toggle {
    position: relative;
    width: 24px;
    height: 12px;
    border-radius: 12px;
    box-sizing: border-box;
    background: linear-gradient(
      90deg,
      var(--figma-color-bg-brand, #0d99ff) 0px 24px,
      var(--figma-color-icon-tertiary, #b3b3b3) 24px 48px
    );
    background-repeat: no-repeat;
    background-size: 200% 100%;
    background-clip: padding-box;
    transition: background-position 0.1s ease-out;
    &-off {
      background-position: -24px;
    }
    &-on {
      background-position: 0;
    }
  }
  .toggle-nub {
    position: absolute;
    top: 1px;
    left: 1px;
    height: 10px;
    width: 10px;
    border-radius: 100%;
    background: var(--figma-color-icon-onbrand, #fff);
    box-sizing: border-box;
    transition: all 0.1s ease-out;
    .toggle-off & {
      left: 1px;
    }
    .toggle-on & {
      left: calc(100% - 11px);
    }
  }
</style>
