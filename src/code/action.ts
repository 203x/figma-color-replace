import {
  isSolidPaint,
  isShadowEffect,
  getAllNode,
  rgb2hex,
  rgba2hex,
  hex2rgb,
  clone,
} from './util/index'
import postBorders from './post'

type ColorType = 'fills' | 'strokes' | 'effects'

interface BaseMsg {
  type: 'replace'
  config?: {
    type: boolean
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findIndex(arr: any[], isTrue: (any) => boolean): number[] {
  return arr.reduce((find: number[], val, idx: number) => {
    if (isTrue(val)) {
      return [...find, idx]
    } else {
      return find
    }
  }, [])
}

function replaceColor(
  node: SceneNode,
  type: ColorType,
  hex: string,
  tohex: string
): void {
  if (type in node && node[type] instanceof Array) {
    let findindex: number[] = []
    if (type === 'fills' || type === 'strokes') {
      findindex = findIndex(node[type], paint => {
        if (isSolidPaint(paint)) {
          let paintHex = ''
          if (hex.length === 8) {
            paintHex = rgba2hex({
              ...paint.color,
              a: paint.opacity,
            })
          } else if (hex.length === 6) {
            paintHex = rgb2hex(paint.color)
          }
          return paintHex === hex
        }
        return false
      })
    } else if (type === 'effects') {
      findindex = findIndex(node[type], effect => {
        if (isShadowEffect(effect)) {
          let paintHex = ''
          if (hex.length === 8) {
            paintHex = rgba2hex(effect.color)
          } else if (hex.length === 6) {
            paintHex = rgb2hex(effect.color)
          }
          return paintHex === hex
        }
        return false
      })
    }
    if (findindex.length > 0) {
      const temp = clone(node[type])
      const { r, g, b } = hex2rgb(tohex)
      findindex.forEach(index => {
        temp[index].color.r = r
        temp[index].color.g = g
        temp[index].color.b = b
      })
      node[type] = temp
      postBorders()
    }
  }
}

function finded(
  hex: string,
  tohex: string,
  type: BaseMsg['find']['type']
): void {
  getAllNode().forEach(node => {
    if (type === 'all') {
      replaceColor(node, 'fills', hex, tohex)
      replaceColor(node, 'strokes', hex, tohex)
      replaceColor(node, 'effects', hex, tohex)
    } else {
      replaceColor(node, type, hex, tohex)
    }
  })
}

function replace(msg: BaseMsg): void {
  finded(msg.find.hex, msg.replace.hex, msg.find.type)
}

export default replace
