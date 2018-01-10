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
          path: '/chart',
          name: 'Chart',
          component (resolve) {
            require(['../pages/Chart.vue'], resolve)
          }
        },
        {
          path: '/operators',
          name: 'OperatorTable',
          component (resolve) {
            require(['../pages/OperatorTable.vue'], resolve)
          },
          meta: {menuName: 'operators'}
        },
        {
          path: '/wechatinfos',
          name: 'WeChatInfoTable',
          component (resolve) {
            require(['../pages/WeChatInfoTable.vue'], resolve)
          }
        },
        {
          path: '/operators/new',
          name: 'OperatorNew',
          component (resolve) {
            require(['../pages/OperatorNewAndEdit.vue'], resolve)
          }
        },
        {
          path: '/operators/:id/edit',
          name: 'OperatorEdit',
          component (resolve) {
            require(['../pages/OperatorNewAndEdit.vue'], resolve)
          }
        },
        {
          path: '/operators/:id',
          name: 'OperatorShow',
          component (resolve) {
            require(['../pages/OperatorShow.vue'], resolve)
          }
        },
        {
          path: '/wechatinfos/:id/edit',
          name: 'WeChatInfoEdit',
          component (resolve) {
            require(['../pages/WeChatInfoEdit.vue'], resolve)
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
