// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {},
  css: [
    'primevue/resources/themes/aura-light-blue/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css'
  ],
  build: {
    transpile: ['primevue'] // Đảm bảo các thành phần PrimeVue được biên dịch đúng cách
  },
  plugins: [
    '~/plugins/primevue.js',
    '~/plugins/vue3-toastify.ts',

  ],
  app: {
    head: {
      title: 'OnlineSim - service for private registration at online resources',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/gif', href: 'layout/images/onlinesim-logo.png' } // Set your logo here
      ]
    }
  }
})
