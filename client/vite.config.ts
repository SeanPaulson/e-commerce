import { defineConfig } from "vite";
import { resolve } from "path";

import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        product: resolve(__dirname, 'product/index.html'),
      },
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `
        //     @import "./src/scss/index";
        // `,
      },
    },
  },
  resolve: {
    alias: [
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: "$1",
      },
    ],
  },
});
