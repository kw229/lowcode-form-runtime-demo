import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
          (warning.message.includes('node_modules/antd') ||
            warning.message.includes('node_modules/@ant-design/icons'))
        ) {
          return
        }
        warn(warning)
      }
    }
  }
})
