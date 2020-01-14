<script>
  import { onMount, createEventDispatcher } from 'svelte';

  export let opacity;

  let val = 100
  let self
	onMount( () => {
    reset()
  })

  const reset = ()=>{
    val = opacity.toFixed(4) * 100 + '%'
  }
  
  const handleChange = ()=> {
    let num = parseFloat(val)
    if (Number.isNaN(num)){
      reset()
    }else {
      if (num > 100) {
        num = 100
      }else if(num <= 0) {
        num = 0
      }
      update(num, num + '%')
    }
  }

  const dispatch = createEventDispatcher()

  const update = (real, new_opa)=> {
    opacity = real
    val = new_opa
    dispatch("update", {
      opacity: real
    })
  }
</script>

<style>
input {
  width: 5em;
  padding-left: 5px;
}
</style>

<input
  maxlength='6'
  minlength='2'
  type="text"
  disabled
  bind:value={val}
  bind:this={self}
  on:change={handleChange}
  on:focus={()=>{self.select()}}>
