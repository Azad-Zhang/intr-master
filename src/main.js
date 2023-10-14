import { createApp } from 'vue'

import App from './App.vue'
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import 'element-plus/theme-chalk/index.css';
import "@/assets/css/main.css";
import api from "./api/api.js"

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);

app.mount('#app');

