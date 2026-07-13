import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/datasummary": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/projectdata": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/product": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/productmodify": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
