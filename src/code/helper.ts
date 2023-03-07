import Color from '../util/color'

const hasColor = {
  fills(node: SceneNode): boolean {
    return (
      'fills' in node && node.fills instanceof Array && node.fills.length > 0
    )
  },
  strokes(node: SceneNode): boolean {
    return (
      'strokes' in node &&
      node.strokes instanceof Array &&
      node.strokes.length > 0
    )
  },
  effects(node: SceneNode): boolean {
    return (
      'effects' in node &&
      node.effects instanceof Array &&
      node.effects.length > 0
    )
  },
  all(node: SceneNode): boolean {
    return (
      hasColor.fills(node) || hasColor.strokes(node) || hasColor.effects(node)
    )
  },
}

function getAllNode(
  nodes: readonly SceneNode[],
  callback?: (node: SceneNode) => boolean
): SceneNode[] {
  let result: SceneNode[] = []
  nodes.forEach((node) => {
    if (node.type !== 'SLICE' && callback!(node)) {
      result.push(node)
    }
    if ('findAll' in node) {
      result = result.concat(
        node.findAll((node) => {
          return callback!(node)
        })
      )
    }
  })
  return result
}

function isSolidPaint(paint: Paint): paint is SolidPaint {
  return paint.type === 'SOLID'
}

function isShadowEffect(
  effect: Effect
): effect is DropShadowEffect | InnerShadowEffect {
  return effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW'
}

// function paintToColor(paint: SolidPaint): NodeColor
function paintToColor(paint: Paint): NodeColor | null {
  if (isSolidPaint(paint)) {
    const { r, g, b } = paint.color
    return {
      hex: new Color(r, g, b).hex,
      opacity: paint.opacity,
      visible: paint.visible,
    }
  }
  return null
}

// function effectToColor(effect: DropShadowEffect | InnerShadowEffect): NodeColor
function effectToColor(effect: Effect): NodeColor | null {
  if (isShadowEffect(effect)) {
    const { r, g, b, a } = effect.color
    return {
      hex: new Color(r, g, b, a).hex,
      opacity: a,
      visible: effect.visible,
    }
  }
  return null
}

const collectNode = {
  fills(fills: readonly Paint[]): Array<NodeColor | null> {
    return fills.map((paint) => paintToColor(paint))
  },
  strokes(strokes: readonly Paint[]): Array<NodeColor | null> {
    return strokes.map((paint) => paintToColor(paint))
  },
  effects(effects: readonly Effect[]): Array<NodeColor | null> {
    return effects.map((effect) => effectToColor(effect))
  },
}

function clone<Type>(val: Type): Type {
  const type = typeof val
  if (val === null) {
    // @ts-ignore
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
      // @ts-ignore
      return val.map((x) => clone(x))
    } else if (val instanceof Uint8Array) {
      // @ts-ignore
      return new Uint8Array(val)
    } else {
      let o = {}
      for (const key in val) {
        // @ts-ignore
        o[key] = clone(val[key])
      }
      // @ts-ignore
      return o
    }
  }
  throw 'unknown'
}

export {
  getAllNode,
  hasColor,
  isSolidPaint,
  isShadowEffect,
  collectNode,
  paintToColor,
  effectToColor,
  clone,
}
