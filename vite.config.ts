import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user": {
        target: "http://192.168.1.140:5173",
        changeOrigin: true,
      },
    },
    host: true,
  },
});
