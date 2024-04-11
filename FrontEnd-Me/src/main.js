import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import './index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(PrimeVue)

app.mount('#app')
