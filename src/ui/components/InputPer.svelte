<script lang="ts">
  export let opacity: number

  let val = '100%'
  let self: HTMLInputElement

  $: {
    val = toPer(float(opacity))
  }

  function float(num_or_str: number | string): number {
    // @ts-ignore
    const t = Number.parseFloat(num_or_str)
    if (Number.isNaN(t)) {
      return 0
    } else {
      return t
    }
  }

  function toPer(num: number): string {
    const t = num * 100
    return float(t.toFixed(2)).toString() + '%'
  }

  const handleChange = () => {
    let num = Number.parseFloat(val)
    if (Number.isNaN(num)) {
      val = toPer(float(opacity) / 100)
    } else {
      if (num > 100) {
        num = 100
      } else if (num <= 0) {
        num = 0
      }
      opacity = num / 100
    }
  }
</script>

<input
  maxlength="6"
  minlength="1"
  type="text"
  disabled
  bind:value={val}
  bind:this={self}
  on:change={handleChange}
  on:focusin={() => {
    self.select()
  }}
/>

<style>
  input {
    width: 4em;
    padding-left: 5px;
    background-color: transparent;
  }
</style>
