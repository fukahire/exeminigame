import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'


// https://vite.dev/config/
export default defineConfig({
  base: '/exeminigame/', 
  plugins: [vue(),
    tailwindcss(),
  {
    name: 'copy-404',
    closeBundle() {
      fs.copyFileSync('dist/index.html', 'dist/404.html')
    }
  }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }

})
