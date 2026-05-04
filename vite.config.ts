import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  // 1. 再次確認：你的 Repository 名字現在真的是 "exeminigame" 嗎？
  // 如果你的新 Repo 名字叫 "new-project"，這裡就要改成 "/new-project/"
  base: '/exeminigame/', 
  
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'fix-gh-pages',
      closeBundle() {
        // 檢查 dist 目錄是否存在
        if (fs.existsSync('dist')) {
          // 原本你有的：複製 404.html
          fs.copyFileSync('dist/index.html', 'dist/404.html')
          
          // 新增這行：建立空的 .nojekyll 檔案，這能解決底線檔案找不到的問題
          fs.writeFileSync('dist/.nojekyll', '')
          
          console.log('✅ 已自動產生 404.html 與 .nojekyll')
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