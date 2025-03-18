// vite.config.json

import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'
import path from 'path' // npm install path
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for the src directory
      "@components": path.resolve(__dirname, "./src/components"), // Alias for components
      "@assets": path.resolve(__dirname, "./src/assets"), // Alias for assets
      "@pages": path.resolve(__dirname, "./src/pages")
      // Add more aliases as needed
    },
  },
});
