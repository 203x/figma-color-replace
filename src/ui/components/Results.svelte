<script>
  import { setContext } from 'svelte'
  import ResultsEntry from './ResultsEntry.svelte'
  import { config_fold } from '../stores'
  import { rgb2hex, rgba2hex } from '../util/color.js'
  export let colors = []
  export let typename = 'all'

  setContext('type', {
    getType: () => typename,
  })

  const collectColors = (colors, opacity) => {
    const hashSet = new Set()
    const result = []

    for (let i = 0; i < colors.length; i++) {
      const val = colors[i]
      const key = opacity
        ? rgba2hex({ ...val.color, a: val.opacity })
        : rgb2hex(val.color)
      if (!hashSet.has(key)) {
        hashSet.add(key)
        val.hex = key
        result.push(val)
      }
    }
    // console.log(hashSet)

    return result.reverse()
  }

  $: data = collectColors(colors, $config_fold.opacity)
</script>

<style>
  dl {
    text-transform: capitalize;
  }
  dt {
    font-weight: 500;
    padding-top: 6px;
    padding-bottom: 6px;
    /* font-size: .85em; */
  }
</style>

{#if data.length > 0}
  <dl class="panel inner">
    <dt class="inner no-select">
      <slot />
    </dt>
    {#each data as color (color.hex)}
      <dd>
        <ResultsEntry {...color} />
      </dd>
    {/each}
  </dl>
{/if}
