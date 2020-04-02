<script>
  import ColorBlock from './modal/ColorBlock.svelte'
  import InputPer from './InputPer.svelte'
  import InputHex from './InputHex.svelte'
  import { onMount, getContext } from 'svelte'
  import { rgb2hex, rgba2hex, float2Hex } from '../util/color.js'

  import { config_fold } from '../stores'
  export let color
  export let opacity

  // import { debounce, throttle } from '../util/func'

  const { getType } = getContext('type')
  const type = getType()
  let hex = ''
  let opa = 0

  onMount(() => {
    hex = rgb2hex(color)
    opa = opacity
  })

  const update = ({ detail }) => {
    let pluginMessage = {}
    console.log(detail)
    if (detail.hex) {
      if (hex !== detail.hex) {
        hex = detail.hex
      }
      pluginMessage = {
        type: 'replace',
        config: {
          type: $config_fold.type,
          opacity: $config_fold.opacity,
        },
        find: {
          type: type,
          hex: $config_fold.opacity
            ? rgba2hex({ ...color, a: opacity })
            : rgb2hex(color),
        },
        replace: {
          hex: hex,
        },
      }
    } else if (detail.opacity) {
      console.error('TODE', detail.opacity, opa, opacity)
      // pluginMessage = {
      //   type: 'replace',
      //   config: {
      //     type: $config_fold.type,
      //     opacity: $config_fold.opacity,
      //   },
      //   find: {
      //     type: type,
      //     hex: color2hex(color)
      //   },
      //   replace: {
      //     hex: hex
      //   }
      // }
    }
    parent.postMessage({ pluginMessage }, '*')
  }

  const update_hex = hex => {
    const pluginMessage = {
      type: 'replace',
      config: {
        type: $config_fold.type,
        opacity: $config_fold.opacity,
      },
      find: {
        type: type,
        hex: $config_fold.opacity
          ? rgba2hex({ ...color, a: opacity })
          : rgb2hex(color),
      },
      replace: {
        hex: hex,
      },
    }
    parent.postMessage({ pluginMessage }, '*')
  }

  $: if (hex) {
    update_hex(hex)
  }
</script>

<style>
  .show {
    display: flex;
    align-items: center;
    /* padding-top: 6px; */
    /* padding-bottom: 6px; */
    border: 1px solid transparent;
    border-radius: 2px;
    margin-bottom: 2px;
  }
  .show:hover {
    border-color: #e5e5e5;
  }
  .show:focus,
  .show:focus-within {
    border: 1px solid #18a0fb;
    outline: 1px solid #18a0fb;
    outline-offset: -2px;
  }
</style>

{#if hex}
  <div class="show inner">
    <ColorBlock bind:color={hex} />
    <InputHex bind:color={hex} />
    {#if $config_fold.opacity}
      <InputPer bind:opacity={opa} />
    {/if}
  </div>
{/if}
