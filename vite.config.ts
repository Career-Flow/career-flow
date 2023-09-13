import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from './express-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  //plugins: [react(), express('/server')],
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
  },
});
