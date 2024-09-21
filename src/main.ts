import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vine'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'
import 'virtual:svg-icons-register'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)

app.mount('#app')
