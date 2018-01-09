import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'
import iView from 'iview'
import axios from 'axios'

Vue.use(iView)

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://192.168.0.102:3000/api/v1/'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
