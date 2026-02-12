import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/atomic-spinner/',
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
  },
})
