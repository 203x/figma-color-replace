function sendMessage(pluginMessage: ReceiveMessage) {
  if (import.meta.env.DEV) {
    console.log(pluginMessage)
  } else {
    window.parent.postMessage(
      { pluginMessage: pluginMessage, pluginId: '797668496099411237' },
      'https://www.figma.com'
    )
  }
}

export { sendMessage }
