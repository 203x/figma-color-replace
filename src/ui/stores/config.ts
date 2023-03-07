import { writable } from 'svelte/store'
import { sendMessage } from './send'

const config_fold = writable({
  opacity: false,
  type: false,
})

config_fold.subscribe((config) => {
  sendMessage({
    type: 'config',
    data: config,
  })
})

export default config_fold
