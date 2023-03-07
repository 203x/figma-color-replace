<script lang="ts">
  import Color from '../../util/color'
  import PaintControl from './PaintControl.svelte'
  export let colors: (NodeColor | null)[] = []
  export let type: HasColorType | 'all'

  $: colorsUnique = colors.filter(
    (value, index, array) =>
      value &&
      array.findIndex(
        (v) => v?.hex == value.hex && v.opacity == value.opacity
      ) === index
  ) as NodeColor[]
</script>

{#if colorsUnique.length > 0}
  <div>
    <dl class="panel inner">
      <dt class="inner no-select">
        {type}
      </dt>
      {#each colorsUnique as color (color.hex)}
        <PaintControl color={Color.fromHex(color.hex, color.opacity)} {type} />
      {/each}
    </dl>
  </div>
{/if}

<style lang="scss">
  dl {
    text-transform: capitalize;
  }
  dt {
    font-weight: var(--font-weight-medium);
    padding-top: 6px;
    padding-bottom: 6px;
    /* font-size: .85em; */
  }
</style>
