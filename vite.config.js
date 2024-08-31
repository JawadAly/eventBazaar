import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/eventBazaar/",
  server:{
    proxy:{
      '/api':'https://eventify-server-sand.vercel.app'
    }
  },
  plugins: [react()],
})
