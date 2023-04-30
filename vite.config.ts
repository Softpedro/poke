import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true,
    }),

    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/vite-plugin-vue-markdown
    // Markdown({
    //   headEnabled: true,
    //   markdownItSetup(md) {
    //     // https://prismjs.com/
    //     md.use(Shiki, {
    //       theme: {
    //         light: 'vitesse-light',
    //         dark: 'vitesse-dark',
    //       },
    //     })
    //     md.use(LinkAttributes, {
    //       matcher: (link: string) => /^https?:\/\//.test(link),
    //       attrs: {
    //         target: '_blank',
    //         rel: 'noopener',
    //       },
    //     })
    //   },
    // }),
  ],
})
