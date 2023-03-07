import Color from '../util/color'
import {
  clone,
  paintToColor,
  effectToColor,
  getAllNode,
  hasColor,
} from './helper'

const changeColor = {
  fills(node: SceneNode, callback: (paint: Paint) => Paint) {
    if ('fills' in node && node.fills !== figma.mixed) {
      const fills = clone(node.fills)
      node.fills = fills.map((paint) => {
        return callback(paint)
      })
    }
  },
  strokes(node: SceneNode, callback: (paint: Paint) => Paint) {
    if ('strokes' in node) {
      const strokes = clone(node.strokes)
      node.strokes = strokes.map((paint) => {
        return callback(paint)
      })
    }
  },
  effects(node: SceneNode, callback: (effect: Effect) => Effect) {
    if ('effects' in node) {
      const effects = clone(node.effects)
      node.effects = effects.map((effect) => {
        return callback(effect)
      })
    }
  },
}

function isFound(color: NodeColor | null, msg: ReceiveMessageReplace): boolean {
  if (msg.search.hex === color?.hex) {
    if (msg.search.opacity && msg.search.opacity === color.opacity) {
      return true
    } else if (!msg.search.opacity) {
      return true
    }
  }
  return false
}

function paintChangeColor(paint: any, msg: ReceiveMessageReplace): any {
  const color = paintToColor(paint)
  if (color) {
    const targetColor = Color.fromHex(msg.replace.hex, msg.replace.opacity)
    if (targetColor && color && msg.search.hex === color.hex) {
      if (msg.search.opacity && msg.search.opacity === color.opacity) {
        paint.color.r = targetColor.r
        paint.color.g = targetColor.g
        paint.color.b = targetColor.b
        paint.opacity = targetColor.a
      } else if (!msg.search.opacity) {
        paint.color.r = targetColor.r
        paint.color.g = targetColor.g
        paint.color.b = targetColor.b
      }
    }
    return paint
  }
  return paint
}
function effectChangeColor(effect: any, msg: ReceiveMessageReplace): any {
  const color = effectToColor(effect)
  if (color) {
    const targetColor = Color.fromHex(msg.replace.hex, msg.replace.opacity)

    if (targetColor && color && msg.search.hex === color.hex) {
      if (msg.search.opacity && msg.search.opacity === color.opacity) {
        effect.color.r = targetColor.r
        effect.color.g = targetColor.g
        effect.color.b = targetColor.b
        effect.color.a = targetColor.a
      } else if (!msg.search.opacity) {
        effect.color.r = targetColor.r
        effect.color.g = targetColor.g
        effect.color.b = targetColor.b
      }
    }
  }

  return effect
}

const replaceMethod = {
  fills(node: SceneNode, msg: ReceiveMessageReplace) {
    if ('fills' in node && node.fills !== figma.mixed) {
      if (node.fills.some((paint) => isFound(paintToColor(paint), msg))) {
        changeColor.fills(node, (paint) => paintChangeColor(paint, msg))
      }
    }
  },
  strokes(node: SceneNode, msg: ReceiveMessageReplace) {
    if ('strokes' in node) {
      if (node.strokes.some((paint) => isFound(paintToColor(paint), msg))) {
        changeColor.strokes(node, (paint) => paintChangeColor(paint, msg))
      }
    }
  },
  effects(node: SceneNode, msg: ReceiveMessageReplace) {
    if ('effects' in node) {
      if (node.effects.some((effect) => isFound(effectToColor(effect), msg))) {
        changeColor.effects(node, (effect) => effectChangeColor(effect, msg))
      }
    }
  },
}

function replace(msg: ReceiveMessageReplace): void {
  switch (msg.search.type) {
    case 'fills':
      getAllNode(figma.currentPage.selection, (node) =>
        hasColor.fills(node)
      ).forEach((node) => {
        replaceMethod.fills(node, msg)
      })
      break
    case 'strokes':
      getAllNode(figma.currentPage.selection, (node) =>
        hasColor.strokes(node)
      ).forEach((node) => {
        replaceMethod.strokes(node, msg)
      })
      break
    case 'effects':
      getAllNode(figma.currentPage.selection, (node) =>
        hasColor.effects(node)
      ).forEach((node) => {
        replaceMethod.effects(node, msg)
      })
      break
    case 'all':
      getAllNode(figma.currentPage.selection, (node) =>
        hasColor.all(node)
      ).forEach((node) => {
        replaceMethod.fills(node, msg)
        replaceMethod.strokes(node, msg)
        replaceMethod.effects(node, msg)
      })
      break
  }
}

export { replace }
