import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import './assets/css/index.css'

import { Button, Popup, ShareSheet, Cell, Grid, GridItem } from 'vant'

const comps = [Button, Popup, ShareSheet, Cell, Grid, GridItem]

const app = createApp(App)

comps.forEach((component) => {
  app.use(component)
})
app.config.globalProperties.$http = 'axios'
app.config.performance = true

// 链式挂载
app.use(router).use(store).mount('#app')
