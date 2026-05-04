import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: '/exeminigame/', // 對應你的網址路徑，正確無誤
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'fix-gh-pages',
      closeBundle() {
        if (fs.existsSync('dist')) {
          // 1. 產生 404.html (你原本就有的功能)
          fs.copyFileSync('dist/index.html', 'dist/404.html')
          
          // 2. 產生 .nojekyll (解決底線檔案 404 的關鍵)
          fs.writeFileSync('dist/.nojekyll', '')
          
          console.log('✅ 已成功產生 404.html 與 .nojekyll 檔案');
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})