import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import express from "./express-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/login": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
    host: true,
  },
});
