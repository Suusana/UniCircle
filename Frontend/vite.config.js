import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/timetable': 'http://localhost:8080',
      '/friends': 'http://localhost:8080',
      "/studentProfile": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
