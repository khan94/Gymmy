import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [macrosPlugin(), react()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      axios: 'axios',
    },
  },
  server: {
    port: 3000,
    // https: {
    //   key: './localhost.key',
    //   cert: 'localhost.crt',
    // },
    proxy: {
      '/api': {
        target: 'http://localhost:6001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
})
