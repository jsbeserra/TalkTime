import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import  EnvironmentPlugin  from  'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),EnvironmentPlugin('all')],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@domain': '/src/domain',
      '@aplication': '/src/aplication',
      '@infra': '/src/infra',
      '@main': '/src/main',
      '@presentation': '/src/presentation',
      '@shared': '/src/shared',
    },
  },
})