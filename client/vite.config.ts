import { defineConfig } from "vite";
// import path from 'path';
import react from "@vitejs/plugin-react-swc";
// const root = path.resolve(__dirname, 'src');
// const root = __dirname;
// console.log(root);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // root,
  // base: path.join('/', root),
  // build: {

  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
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
