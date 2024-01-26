import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ReactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ReactRefresh()],
  assetsInclude: ['**/*.JPG'],
  build: {
    chunkSizeWarningLimit: 2000000, // Set your desired limit (1 MB in this example)
    outDir: 'dist',
  },
})
