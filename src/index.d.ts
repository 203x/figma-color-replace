/**
 * Base
 */

interface NodeColor {
  hex: string
  opacity?: number
  visible?: boolean
}

type HasColorType = 'fills' | 'strokes' | 'effects'
// type HasColorNode = Exclude<SceneNode, SliceNode>

/**
 * ReceiveMessage
 * UI -> Code
 */

interface ReceiveMessageReplace {
  type: 'replace'
  search: {
    type: HasColorType | 'all'
    hex: string
    opacity?: number
  }
  replace: {
    hex: string
    opacity?: number
  }
}

type ReceiveMessage = ReceiveMessageReplace | MessageConfig

/**
 * SendMessage
 * Code -> UI
 */

interface ColorCollect {
  fills: (NodeColor | null)[]
  strokes: (NodeColor | null)[]
  effects: (NodeColor | null)[]
}

interface SendMessageCollect {
  type: 'node-collect'
  data: ColorCollect
}

interface MessageConfig {
  type: 'config'
  data: {
    opacity: boolean
    type: boolean
  }
}

type SendMessage = SendMessageCollect | MessageConfig
