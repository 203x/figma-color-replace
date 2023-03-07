<script lang="ts">
  export let color: string

  let val = ''
  let self: HTMLInputElement

  $: {
    val = color
  }

  const handleChange = () => {
    const format = (str: string, char: string): string => {
      return str.replace(/(\d)/g, (m, n) => char.charAt(parseInt(n)))
    }
    const hexm = /[a-fA-F0-9]+/.exec(val)
    if (hexm) {
      switch (hexm[0].length) {
        case 1:
          update(format('000000', hexm[0]))
          break
        case 2:
          update(format('010101', hexm[0]))
          break
        case 3:
          update(format('001122', hexm[0]))
          break
        case 4:
          update(format('001122', hexm[0]))
          break
        case 5:
          update(format('001122', hexm[0]))
          break
        default:
          update(format('012345', hexm[0]))
          break
      }
    } else {
      val = color
    }
  }

  const update = (new_hex: string) => {
    color = new_hex
    val = new_hex
  }
</script>

<input
  class="inner"
  maxlength="6"
  minlength="3"
  type="text"
  bind:value={val}
  bind:this={self}
  on:change={handleChange}
  on:focusin={() => {
    self.select()
  }}
/>

<style>
  input {
    text-transform: uppercase;
    width: 6em;
  }
</style>
