import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite';

type Port = {
  host: boolean;
  port: number;
}

const port: Port = {
  host: true,
  port: 3000
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: port,
  preview: port,
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})
