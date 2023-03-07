import config_fold from './config'
import colors from './colors'

window.onmessage = (event) => {
  const message: SendMessage = event.data.pluginMessage
  switch (message?.type) {
    case 'node-collect':
      colors.set(message.data)
      break
    case 'config':
      config_fold.set(message.data)
      break
    // default:
    //   break
  }
}

export { config_fold, colors }
