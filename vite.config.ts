import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

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
  },
  build: {
    rollupOptions: {
      output: {
        // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
        sanitizeFileName(name) {
          const match = DRIVE_LETTER_REGEX.exec(name);
          const driveLetter = match ? match[0] : '';
          // substr 是被淘汰語法，因此要改 slice
          return (
            driveLetter +
            name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
          );
        },
      },
    },
  }
})