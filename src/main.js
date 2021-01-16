import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import vantInit from './plugin/vant-init'
import './assets/css/index.css'

const app = createApp(App)
// 按需引入初始化 vant
vantInit(app)

app.config.globalProperties.$http = 'axios'
app.config.performance = true

// 链式挂载
app.use(router).use(store).mount('#app')
