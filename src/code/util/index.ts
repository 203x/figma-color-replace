import { rgb2hex, rgba2hex, hex2rgb, hex2rgba } from './color'

function isSolidPaint(paint: Paint): boolean {
  return paint.type === 'SOLID'
}

function isShadowEffect(effect: Effect): boolean {
  return effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW'
}

function isInstanceNode(node: SceneNode): boolean {
  return node.type === 'INSTANCE'
}

function getAllNode(): SceneNode[] {
  let nodes = []
  figma.currentPage.selection.forEach(node => {
    nodes.push(node)
    if ('findAll' in node) {
      nodes = [...nodes, ...node.findAll()]
    }
  })
  return nodes
}

function clone(val: any): any {
  const type = typeof val
  if (val === null) {
    return null
  } else if (
    type === 'undefined' ||
    type === 'number' ||
    type === 'string' ||
    type === 'boolean'
  ) {
    return val
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(x => clone(x))
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val)
    } else {
      let o = {}
      for (const key in val) {
        o[key] = clone(val[key])
      }
      return o
    }
  }
  throw 'unknown'
}

export {
  isSolidPaint,
  isShadowEffect,
  getAllNode,
  rgb2hex,
  rgba2hex,
  hex2rgb,
  hex2rgba,
  clone,
}
