function num255(num) {
  return Math.round(num * 255)
}

function float2Hex(c) {
  const hex = num255(c).toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

function rgb2hex(rgb) {
  const r = num255(rgb.r)
  const g = num255(rgb.g)
  const b = num255(rgb.b)
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function rgba2hex(rgba) {
  const { r, g, b, a } = rgba
  return rgb2hex({ r, g, b }) + float2Hex(a)
}

function hex2rgb(hex) {
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null
}

function hex2rgba(hex) {
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
        a: parseInt(result[4], 16) / 255,
      }
    : null
}

export { rgb2hex, rgba2hex, hex2rgb, hex2rgba, float2Hex }
