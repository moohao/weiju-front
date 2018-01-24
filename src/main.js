import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'
import iView from 'iview'
import axios from 'axios'
import store from './store'
// 全局变量
import '../config/globalUrl.js'

Vue.use(iView)

Vue.config.productionTip = false
Vue.prototype.$http = axios

axios.defaults.timeout = 5000

let env = process.env.NODE_ENV
let authorization = window.localStorage.getItem('authorization')
if (authorization !== null) {
  axios.defaults.headers.common['Authorization'] = authorization
}
if (env === 'production') {
  axios.defaults.baseURL = 'http://fl.00603.top/api/v1/admin/'
} else {
  axios.defaults.baseURL = 'http://weiju.lindo.io/api/v1/'
}

if (store.state.user === null) {
  store.dispatch('loadUser').then(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  })
} else {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
