/**
 * 单位转换
 *
 * @param   Number  num       [0, 1] 范围内
 * @param   Number  base      1单位num等于base整数
 * @return  Number            [0, base单位] 范围内
 */
function float2num(num: number, base: number = 255): number {
  return Math.round(num * base)
}

function num2float(num: number, base: number = 255): number {
  return num / base
}

function float2hex(
  num: number,
  base: number = 255,
  radix: number = 16
): string {
  const hex = float2num(num, base).toString(radix)
  return hex.length == 1 ? '0' + hex : hex
}

function hex2float(
  hex: string,
  base: number = 255,
  radix: number = 16
): number {
  return parseInt(hex, radix) / base
}

class Color {
  r: number
  g: number
  b: number
  a: number
  static prefix: string = ''

  constructor(r: number = 1, g: number = 1, b: number = 1, a: number = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  static #hexParse(hex: string): RGB | RGBA | null {
    const regex =
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{0,2})$/i.exec(hex)
    if (regex) {
      if (regex[4]) {
        return {
          r: hex2float(regex[1]),
          g: hex2float(regex[2]),
          b: hex2float(regex[3]),
          a: hex2float(regex[4]),
        }
      } else {
        return {
          r: hex2float(regex[1]),
          g: hex2float(regex[2]),
          b: hex2float(regex[3]),
        }
      }
    } else {
      return null
    }
  }

  static fromHex(hex: string, opacity?: number): Color | null {
    const rgb_or_rgba = this.#hexParse(hex)
    if (rgb_or_rgba) {
      const color: Color = new Color(
        rgb_or_rgba.r,
        rgb_or_rgba.g,
        rgb_or_rgba.b,
        'a' in rgb_or_rgba ? rgb_or_rgba.a : 1
      )
      if (opacity && opacity <= 1 && opacity >= 0) {
        color.a = opacity
      }
      return color
    } else {
      return null
    }
  }

  static is(value1: any, value2: any): boolean {
    if (value1 instanceof Color && value2 instanceof Color) {
      return value1.eq(value2)
    }
    return false
  }

  eq(value: Color): boolean {
    return value.hexa === this.hexa
  }

  get hexa(): string {
    return (
      Color.prefix +
      (
        (1 << 24) +
        (float2num(this.r) << 16) +
        (float2num(this.g) << 8) +
        float2num(this.b)
      )
        .toString(16)
        .slice(1) +
      float2hex(this.a)
    )
  }

  get hex(): string {
    return (
      Color.prefix +
      (
        (1 << 24) +
        (float2num(this.r) << 16) +
        (float2num(this.g) << 8) +
        float2num(this.b)
      )
        .toString(16)
        .slice(1)
    )
  }

  set hex(value) {
    const rgb_or_rgba = Color.#hexParse(value)
    if (rgb_or_rgba) {
      this.r = rgb_or_rgba.r
      this.g = rgb_or_rgba.g
      this.b = rgb_or_rgba.b
      if ('a' in rgb_or_rgba) {
        this.a = rgb_or_rgba.a
      }
    }
  }

  get hsl() {
    /**
     * Hue: [0, 360]
     * Saturation: [0, 100] %
     * Lightness: [0, 100] %
     */

    const max = Math.max(this.r, this.g, this.b),
      min = Math.min(this.r, this.g, this.b)
    let h: number = 0,
      s: number = 0,
      l: number = (max + min) / 2

    if (max != min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case this.r:
          h = (this.g - this.b) / d + (this.g < this.b ? 6 : 0)
          break
        case this.g:
          h = (this.b - this.r) / d + 2
          break
        case this.b:
          h = (this.r - this.g) / d + 4
          break
      }

      h /= 6
    }

    h *= 360
    s *= 100
    l *= 100

    return { h, s, l }
  }

  set hsl({ h, s, l }) {
    h = h / 360
    s = s / 100
    l = l / 100

    let r, g, b

    if (s == 0) {
      r = g = b = l // achromatic
    } else {
      function hue2rgb(p: number, q: number, t: number): number {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    this.r = r
    this.g = g
    this.b = b
  }

  get rgb() {
    return {
      r: float2num(this.r),
      g: float2num(this.g),
      b: float2num(this.b),
    }
  }

  set rgb({ r, g, b }) {
    this.r = num2float(r)
    this.g = num2float(g)
    this.b = num2float(b)
  }

  get rgba() {
    return {
      r: float2num(this.r),
      g: float2num(this.g),
      b: float2num(this.b),
      a: float2num(this.a, 100),
    }
  }

  set rgba({ r, g, b, a }) {
    this.r = num2float(r)
    this.g = num2float(g)
    this.b = num2float(b)
    this.a = num2float(a, 100)
  }

  get css() {
    if (this.a == 1) {
      const { r, g, b } = this.rgb
      return `rgb(${r}, ${g}, ${b})`
    } else {
      const { r, g, b, a } = this.rgba
      return `rgba(${r}, ${g}, ${b}, ${a})`
    }
  }

  toString(): string {
    return this.hex
  }

  clone(): Color {
    return new Color(this.r, this.g, this.b, this.a)
  }
}

export default Color
