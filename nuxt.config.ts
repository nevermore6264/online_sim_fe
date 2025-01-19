import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['notivue/nuxt', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'vi', name: 'Tiếng Việt' }
    ],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts', // Chỉ định đường dẫn tới file cấu hình i18n
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {},
  css: [
    'notivue/notification.css', // Only needed if using built-in <Notification />
    'notivue/animations.css', // Only needed if using default animations
    'primevue/resources/themes/aura-light-blue/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'flag-icon-css/css/flag-icons.min.css',
    'primeflex/primeflex.css'
  ],
  build: {
    transpile: ['primevue'] // Đảm bảo các thành phần PrimeVue được biên dịch đúng cách
  },
  plugins: [
    '~/plugins/primevue.js',
    '~/plugins/vue3-toastify.ts',
    '~/plugins/gapi.client.js',
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