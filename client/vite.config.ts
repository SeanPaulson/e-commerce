import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: `
                @import "./src/scss/custom";
            `
        }
    }
  },
  resolve: {
    alias: [
        {
            // this is required for the SCSS modules
            find: /^~(.*)$/,
            replacement: '$1',
        },
    ],
},
})
