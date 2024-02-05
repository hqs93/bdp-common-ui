import path, { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import { Alias, ConfigEnv, defineConfig, UserConfig } from "vite";
import {alias} from '../../scripts'

export default defineConfig( async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  // let docsBuild = {}
  // if (mode === 'docs') {
  //   docsBuild.base = './'
  //   docsBuild.build = {
  //     outDir: '../../docs/.vitepress/dist/element-plus'
  //   }
  // }
  return {
    server: {
      port: 3200
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          hack: `@import "${path.resolve(__dirname, 'theme/dfm.less')}";`
        },
      },
    },
    plugins: [vue()],
    build: {
      rollupOptions: {
        external: ['ant-design-vue-v3.2.2', 'vue']
      },
      lib: {
        entry: path.resolve(__dirname, './components/index.ts'),
        name: 'bdpUi',
        fileName: 'ant-design-vue-v3.2.2',
        formats: ['es', 'cjs', 'umd', 'iife']
      }
    },
    resolve: {
      alias: [
        ...await alias() as Alias[],
        { find: /^~/, replacement: '' }
      ],
    },
    // ...docsBuild
  }
})