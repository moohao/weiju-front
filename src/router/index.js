import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component (resolve) {
        require(['../pages/Home.vue'], resolve)
      }
    }
  ]
})
export default router
