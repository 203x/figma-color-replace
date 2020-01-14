<script>
  import { onMount, createEventDispatcher } from 'svelte';
  export let color;

  let val = ''
  let self

	onMount( () => {
    reset()
  })

  const reset = ()=>{
    val = color
  }
	// afterUpdate( () => {
  //   hex_to = color
  // })
	// afterUpdate(async () => {
  //   console.log('the component is about to update');
  //   hex_to = color
  //   await tick()
	// 	console.log('the component just updated');
	// })

  const handleChange = ()=> {
    const format = (str, char) => {
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
    }else{
      reset()
    }
  }

  const dispatch = createEventDispatcher()

  const update = (new_hex)=> {
    val = new_hex
    if (color !== new_hex) {
      color = new_hex
      dispatch("update", {
        hex: new_hex
      })
    }
  }
</script>

<style>
  input {
    text-transform: uppercase;
    width: 6em;
  }
</style>

<input
  class="inner"
  maxlength='6' minlength='3'
  type="text"
  bind:value={val}
  bind:this={self}
  on:change={handleChange}
  on:focus={()=>{self.select()}}>
