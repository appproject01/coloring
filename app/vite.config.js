import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from any IP address in your local network
    port: 3000, // Specify the port you want to use
  },
  base: './',
  build: {
    outDir: '../docs',
  },
})
