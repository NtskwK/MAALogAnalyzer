import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 只在 GitHub Pages 部署时使用仓库名作为 base
  base: process.env.DEPLOY_PAGES ? '/MAALogAnalyzer/' : '/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})