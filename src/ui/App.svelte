<script lang="ts">
  import { colors, config_fold } from './stores/index'
  import PaintPanel from './components/PaintPanel.svelte'
  import Toggle from './components/modal/Toggle.svelte'
  // let styleTagDefinitions = document.getElementById("figma-style").innerHTML
</script>

<div class="main">
  <div class="panel inner no-select">
    <div class="inner switch-set">
      <div class="name">Type</div>
      <button
        class="value"
        on:click={() => ($config_fold.type = !$config_fold.type)}
      >
        <Toggle checked={$config_fold.type} />
      </button>
    </div>
    <div class="inner switch-set">
      <div class="name">Opacity</div>
      <button
        class="value"
        on:click={() => ($config_fold.opacity = !$config_fold.opacity)}
      >
        <Toggle checked={$config_fold.opacity} />
      </button>
    </div>
  </div>

  {#if $config_fold.type}
    <PaintPanel type="fills" colors={$colors.fills} />
    <PaintPanel type="strokes" colors={$colors.strokes} />
    <PaintPanel type="effects" colors={$colors.effects} />
  {:else}
    <PaintPanel
      type="all"
      colors={[...$colors.fills, ...$colors.strokes, ...$colors.effects]}
    />
  {/if}
</div>

<style lang="scss">
  .main {
    // margin-top: 10px;
    margin-bottom: 10px;
  }
  .switch-set {
    display: flex;
    min-height: 30px;
    .name {
      color: var(--figma-color-text-secondary, rgba(0, 0, 0, 0.8));
      line-height: 30px;
      width: 40%;
    }
    .value {
      width: 60%;
    }
  }
</style>
