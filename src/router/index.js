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
      },
      children: [
        {
          path: '/operators',
          name: 'OperatorTable',
          component (resolve) {
            require(['../pages/OperatorTable.vue'], resolve)
          }
        },
        {
          path: '/wechatinfos',
          name: 'WeChatInfoTable',
          component (resolve) {
            require(['../pages/WeChatInfoTable.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component (resolve) {
        require(['../pages/Login.vue'], resolve)
      }
    }
  ]
})
export default router
