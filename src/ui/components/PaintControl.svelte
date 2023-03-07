<script lang="ts">
  import type Color from '../../util/color'
  import { sendMessage } from '../stores/send'
  import InputHex from './InputHex.svelte'
  import InputPer from './InputPer.svelte'
  import ColorBlock from './modal/ColorBlock.svelte'

  import { config_fold } from '../stores'

  export let color: Color
  export let type: HasColorType | 'all'

  let old_color: Color

  $: changeColor(color)

  function changeColor(new_color: Color) {
    if (old_color && !old_color.eq(new_color)) {
      if ($config_fold.opacity) {
        sendMessage({
          type: 'replace',
          search: {
            type: type,
            hex: old_color.hex,
            opacity: old_color.a,
          },
          replace: {
            hex: new_color.hex,
            opacity: new_color.a,
          },
        })
      } else {
        sendMessage({
          type: 'replace',
          search: {
            type: type,
            hex: old_color.hex,
          },
          replace: {
            hex: new_color.hex,
          },
        })
      }

      old_color = new_color.clone()
    } else {
      old_color = new_color.clone()
    }
  }
</script>

<dd class="show inner">
  <ColorBlock bind:color={color.hex} lightness={color.hsl.l >= 92} />
  <InputHex bind:color={color.hex} />
  {#if $config_fold.opacity}
    <InputPer bind:opacity={color.a} />
  {/if}
</dd>

<style lang="scss">
  .show {
    display: flex;
    align-items: center;
    /* padding-top: 6px; */
    /* padding-bottom: 6px; */
    border: 1px solid transparent;
    border-radius: 2px;
    margin-bottom: 2px;
    &:hover {
      border-color: var(--figma-color-border, rgba(0, 0, 0, 0.1));
    }
    &:focus,
    &:not(:disabled):focus-within {
      border: 1px solid var(--figma-color-text-selected, #18a0fb);
      outline: 1px solid var(--figma-color-text-selected, #18a0fb);
      outline-offset: -2px;
    }
  }
</style>
