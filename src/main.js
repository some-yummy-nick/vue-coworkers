import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/style.scss'
import {store} from "@/store";

import BaseOverlay from "@/components/base-overlay.vue"

const app = createApp(App)

app.use(store)

app.component('BaseOverlay', BaseOverlay)
app.mount('#app')
