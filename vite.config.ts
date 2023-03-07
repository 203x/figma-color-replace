import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import html from 'vite-plugin-html-inline'
import Inspect from 'vite-plugin-inspect'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      plugins: [svelte(), html(), Inspect()],
    }
  }else{
    return {
      plugins: [svelte(), html()],
      build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'ui.html'),
          },
        },
      },
    }
  }
})
