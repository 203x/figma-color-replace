import { hasColor, getAllNode, collectNode } from './helper'

function nodeCollect(nodes: SceneNode[]): ColorCollect {
  const result: ColorCollect = {
    fills: [],
    strokes: [],
    effects: [],
  }
  nodes.forEach((node) => {
    if ('fills' in node && node.fills !== figma.mixed) {
      result.fills = result.fills.concat(collectNode.fills(node.fills))
    }
    if ('strokes' in node) {
      result.strokes = result.strokes.concat(collectNode.strokes(node.strokes))
    }
    if ('effects' in node) {
      result.effects = result.effects.concat(collectNode.effects(node.effects))
    }
  })

  return result
}

function sendMessage(): SendMessageCollect {
  const all_node = getAllNode(figma.currentPage.selection, hasColor.all)
  const result: SendMessageCollect = {
    type: 'node-collect',
    data: nodeCollect(all_node),
  }
  // console.log('====================================');
  // console.log(JSON.stringify(result.data))
  // console.log( result);
  // console.log('====================================');
  return result
}

export { sendMessage }
