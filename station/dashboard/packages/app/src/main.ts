import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { io } from 'socket.io-client'

import './assets/main.css'

io()

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
