import App from './App'
// main.js



// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false

// 引入uview
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 引入封装好的api集合
import API from "./api/index.js"
Vue.prototype.$api = API

//引入自定义的tabBar组件
import tabBar from "components/tabBar/tabBar.vue"
Vue.component('tab-bar', tabBar)

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif