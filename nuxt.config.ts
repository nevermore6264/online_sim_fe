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
    '~/plugins/primevue.js'  // Đảm bảo bạn đã thêm plugin này vào
  ],
})
