import {isSolidPaint, isShadowEffect, getAllNode} from './util/index'

type NodeCollect = {
  id: string
  fills?: Array<NodeColor>
  strokes?: Array<NodeColor>
  effects?: Array<NodeColor>
}

type NodeColor = {
  color: RGB
  opacity: number
  visible: boolean
}

type ColorType = 'fills' | 'strokes' | 'effects'

function find_type_color(node: SceneNode, type: ColorType): Array<NodeColor> {
  if (type in node && node[type] instanceof Array) {
    if (type === 'fills' || type === 'strokes') {
      return node[type].filter(isSolidPaint).map(paint => {
        return {
          color: paint.color,
          opacity: paint.opacity,
          visible: paint.visible
        }
      })
    }else if (type === 'effects') {
      return node[type].filter(isShadowEffect).map(effect => {
        return {
          color: {
            r: effect.color.r,
            g: effect.color.g,
            b: effect.color.b
          },
          opacity: effect.color.a,
          visible: effect.visible
        }
      })
    }
  }
  return null
}

function collectColors(node: SceneNode): NodeCollect {
  const collect = {
    id: node.id
  }
  const fills = find_type_color(node, 'fills')
  if (fills) {
    collect['fills'] = fills
  }
  const strokes = find_type_color(node, 'strokes')
  if (strokes) {
    collect['strokes'] = strokes
  }
  const effects = find_type_color(node, 'effects')
  if (effects) {
    collect['effects'] = effects
  }
  return collect
}

function postBorders() {
  const data = getAllNode().map(node=>{
    return collectColors(node)
  })

  figma.ui.postMessage({
    type: 'node-collect',
    data: data
  })
}

export default postBorders;
