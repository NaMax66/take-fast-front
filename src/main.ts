import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import ru from '@/locales/ru'
import en from '@/locales/en'

import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/main.css'

const i18n = createI18n({
  locale: 'en',
  allowComposition: true,
  messages: {
    en,
    ru,
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
