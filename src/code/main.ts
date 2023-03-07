// import postBorders from './post'
import { replace } from './action'
import { sendMessage } from './send'

figma.showUI(__html__, {
  width: 200,
  height: 400,
  themeColors: true,
})

/**
 * 发送消息 给 UI HTML界面
 */

figma.skipInvisibleInstanceChildren = true
figma.on('selectionchange', () => {
  figma.ui.postMessage(sendMessage())
})

figma.ui.postMessage(sendMessage())

figma.clientStorage.getAsync('config').then((data) => {
  if (data) {
    figma.ui.postMessage({
      type: 'config',
      data: data,
    })
  } else {
    figma.clientStorage.setAsync('config', {
      opacity: false,
      type: false,
    })
  }
})

/**
 * 从 UI HTML界面 接收动作指令
 */

figma.ui.onmessage = (msg: ReceiveMessage): void => {
  switch (msg?.type) {
    case 'replace':
      replace(msg)
      break
    case 'config':
      figma.clientStorage.setAsync('config', msg.data)
      break
    default:
      break
  }
}
