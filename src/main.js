

import { createApp } from 'vue';
import App from "./App.vue";
import router from "./router"
import 'vant/lib/index.css';
import './index.css'

import {
  Button,
  Popup,
  ShareSheet,
  Cell
} from 'vant';

const comps = [
  Button,
  Popup,
  ShareSheet,
  Cell
];

const app = createApp(App);

comps.forEach(component => {
  app.use(component)
})
app.config.globalProperties.$http = 'axios'
const config = {
  performance: true
}
app.config = config

app.use(router).mount('#app')
