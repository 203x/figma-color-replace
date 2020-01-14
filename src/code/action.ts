import { isSolidPaint, isShadowEffect, getAllNode, rgb2hex, rgba2hex, hex2rgb, clone } from './util/index'
import postBorders from './post'

type ColorType = 'fills' | 'strokes' | 'effects'

interface BaseMsg {
  type: 'replace';
  config?: {
    type: boolean,
    opacity: boolean
  }
  find: {
    type: ColorType | 'all'
    hex: string
  }
  replace: {
    hex: string
  }
}

// type a = SolidPaint | ShadowEffect // Array<NodeColor>

function find_index(arr: Array<any>, isTrue: (any) => boolean): Array<number> {
  return arr.reduce((find: number[], val, idx: number) => {
    if (isTrue(val)) {
      return [...find, idx]
    } else {
      return find
    }
  }, [])
}

function replace_color(node: SceneNode, type: ColorType, hex: string, tohex: string) {
  if (type in node && node[type] instanceof Array) {
    let findindex: number[] = []
    if (type === 'fills' || type === 'strokes') {
      findindex = find_index(node[type], paint => {
        if (isSolidPaint(paint)) {
          let paint_hex = ''
          if (hex.length === 8) {
            paint_hex = rgba2hex({
              ...paint.color,
              a: paint.opacity
            })
          } else if (hex.length === 6) {
            paint_hex = rgb2hex(paint.color)
          }
          return paint_hex === hex
        }
        return false
      })
    } else if (type === 'effects') {
      findindex = find_index(node[type], effect => {
        if (isShadowEffect(effect)) {
          let paint_hex = ''
          if (hex.length === 8) {
            paint_hex = rgba2hex(effect.color)
          } else if (hex.length === 6) {
            paint_hex = rgb2hex(effect.color)
          }
          return paint_hex === hex
        }
        return false
      })
    }
    if (findindex.length > 0) {
      const temp = clone(node[type])
      const { r, g, b } = hex2rgb(tohex)
      findindex.forEach((index) => {
        temp[index].color.r = r
        temp[index].color.g = g
        temp[index].color.b = b
      })
      node[type] = temp
      postBorders()
    }
  }
}

function finded(hex: string, tohex: string, type: BaseMsg['find']['type']) {
  getAllNode().forEach(node => {
    if (type === 'all') {
      replace_color(node, 'fills', hex, tohex)
      replace_color(node, 'strokes', hex, tohex)
      replace_color(node, 'effects', hex, tohex)
    } else {
      replace_color(node, type, hex, tohex)
    }
  })
}

function replace(msg: BaseMsg) {
  finded(msg.find.hex, msg.replace.hex, msg.find.type)
}

export default replace
