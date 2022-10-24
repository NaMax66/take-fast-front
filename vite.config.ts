import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const ENV_PREFIX = 'APP_'

// @ts-ignore
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ENV_PREFIX)

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    preview: {
      /* @ts-ignore */
      host: env.APP_IP,
      /* @ts-ignore */
      port: env.APP_PORT,
    },

    envPrefix: ENV_PREFIX
  });
}
