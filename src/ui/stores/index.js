import { readable, derived, writable } from 'svelte/store'

const color_lib = readable([], set => {
  window.onmessage = e => {
    const message = e.data.pluginMessage
    if (message.type === 'node-collect') {
      // console.log(message.data)
      set(message.data)
    }
  }
})

function collectArray(arr, key) {
  let result = []
  for (const ele of arr) {
    if (ele[key] instanceof Array && ele[key].length > 0) {
      result = [...result, ...ele[key]]
    }
  }
  return result
}

export const colors = derived(color_lib, $color_lib => {
  return {
    fills: collectArray($color_lib, 'fills'),
    strokes: collectArray($color_lib, 'strokes'),
    effects: collectArray($color_lib, 'effects'),
  }
})

export const config_fold = writable({
  opacity: true,
  type: false,
})
