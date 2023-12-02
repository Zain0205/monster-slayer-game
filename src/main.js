import './assets/main.css'
import Status from './components/Status.vue'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.component('Status', Status)

app.mount('#app')
