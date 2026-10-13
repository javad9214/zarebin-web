import '@fontsource/vazirmatn/400.css'
import '@fontsource/vazirmatn/700.css'

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
