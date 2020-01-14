<script>
  import { colors, config_fold } from "./stores";
  import Results from "./components/Results.svelte";
  import Switch from "./components/modal/Switch.svelte";
</script>

<style>
  .main {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .switch-set {
    display: flex;
    align-items: center;
  }
  .switch-set > span {
    display: block;
    margin-left: 6px;
  }
</style>

<div class="main">
  <div class="panel inner no-select">
    <div class="inner switch-set"><Switch bind:checked={$config_fold.type}/> <span>Type</span></div>
    <div class="inner switch-set">
    <Switch bind:checked={$config_fold.opacity}/> <span>Opacity</span>
    </div>
  </div>
  
  {#if $config_fold.type}
    <Results colors={$colors.fills} typename='fills'>fill</Results>
    <Results colors={$colors.strokes} typename='strokes'>stroke</Results>
    <Results colors={$colors.effects} typename='effects'>effects</Results>
  {:else}
    <Results colors={[...$colors.effects, ...$colors.strokes, ...$colors.fills]} typename='all'>All</Results>
  {/if}
</div>


