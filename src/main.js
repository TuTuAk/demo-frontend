import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import './assets/css/button.css'
import './assets/css/tabs.css'
import './assets/css/tooltip.css'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8085'
axios.interceptors.request.use(
  config => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
