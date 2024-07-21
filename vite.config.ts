import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest'

export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest }),
  ],
})

