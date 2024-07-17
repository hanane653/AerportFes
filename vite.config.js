import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000, // Use PORT from environment variables or fallback to 3000
    host: true, // Use this to expose the server on the network
  },
})
