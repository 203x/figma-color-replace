import { writable } from 'svelte/store'
import { sendMessage } from './send'

const colorLibDefault: ColorCollect = import.meta.env.SSR
  ? {
      fills: [],
      strokes: [],
      effects: [],
    }
  : {
      fills: [
        { hex: 'ebfcfa', opacity: 1, visible: true },
        { hex: 'ebfcfa', opacity: 1, visible: true },
        { hex: 'ebfcfa', opacity: 1, visible: true },
        { hex: 'd9d9d9', opacity: 1, visible: true },
      ],
      strokes: [{ hex: 'd75555', opacity: 0.5, visible: true }],
      effects: [{ hex: 'fbc1c140', opacity: 0.25, visible: true }],
    }

const colors = writable<ColorCollect>(colorLibDefault)

export default colors
