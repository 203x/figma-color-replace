import postBorders from './post'
import replace from './action'

interface BaseMsg {
  type: 'replace'
  config?: {
    type: boolean,
    opacity: boolean
  }
  find: {
    type: 'fills' | 'strokes' | 'effects' | 'all'
    hex: string
  }
  replace: {
    hex: string
  }
}

// const config_fold = {
//   opacity: false,
//   type: true
// }

// figma.clientStorage.getAsync('config_fold').then(data=>{
//   if (data) {
//     figma.ui.postMessage({
//       type: 'node-collect',
//       data: data
//     })
//     console.log(data)
//   }else {
//     figma.clientStorage.setAsync('config_fold', config_fold).then(e=>{
//       console.log('init', e)
//     })
//   }
// })


figma.showUI(__html__, {
  width: 180,
  height: 400
})

figma.on("selectionchange", () => {
  postBorders()
})

postBorders()

figma.ui.onmessage = (msg: BaseMsg) => {
  if (msg.type === 'replace') {
    // console.log(msg)
    replace(msg)
  }
}
