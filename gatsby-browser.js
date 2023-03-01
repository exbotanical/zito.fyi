import 'prism-themes/themes/prism-nord.css'

import { QueryWrapper } from './src/context/QueryWrapper'

export const wrapRootElement = QueryWrapper

export function onClientEntry() {
  window.onload = () => {
    function initNoiseEffect() {
      const black = new Uint8ClampedArray([0, 0, 0, 255])
      const white = new Uint8ClampedArray([255, 255, 255, 255])

      const size = 64

      const data = new Uint8ClampedArray(size * size * 4)

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          data.set(
            Math.random() > 0.5 ? white : black,

            (y * size + x) * 4,
          )
        }
      }

      const canvas = document.createElement('canvas')

      canvas.width = canvas.height = size

      const ctx = canvas.getContext('2d')

      ctx.putImageData(new ImageData(data, size, size), 0, 0)

      return new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png')
      })
    }

    initNoiseEffect().then(png => {
      const url = URL.createObjectURL(png)
      const div = document.createElement('div')

      div.classList.add('noise')
      div.style = `background-image: url(${url})`

      document.body.appendChild(div)
    })
  }
}
