import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from '../store'

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
          },
          meta: {menuName: 'Operator'}
        },
        {
          path: '/operators/new',
          name: 'OperatorNew',
          component (resolve) {
            require(['../pages/OperatorNewAndEdit.vue'], resolve)
          },
          meta: {menuName: 'Operator'}
        },
        {
          path: '/operators/:id/edit',
          name: 'OperatorEdit',
          component (resolve) {
            require(['../pages/OperatorNewAndEdit.vue'], resolve)
          },
          meta: {menuName: 'Operator'}
        },
        {
          path: '/operators/:id',
          name: 'OperatorShow',
          component (resolve) {
            require(['../pages/OperatorShow.vue'], resolve)
          },
          meta: {menuName: 'Operator'}
        },
        {
          path: '/wechatinfos',
          name: 'WeChatInfoTable',
          component (resolve) {
            require(['../pages/WeChatInfoTable.vue'], resolve)
          },
          meta: {menuName: 'WeChatInfo'}
        },
        {
          path: '/wechatinfos/:id/edit',
          name: 'WeChatInfoEdit',
          component (resolve) {
            require(['../pages/WeChatInfoEdit.vue'], resolve)
          },
          meta: {menuName: 'WeChatInfo'}
        },
        {
          path: '/wechatinfos/:id',
          name: 'WeChatInfoShow',
          component (resolve) {
            require(['../pages/WeChatInfoShow.vue'], resolve)
          },
          meta: {menuName: 'WeChatInfo'}
        },
        {
          path: '/wechatinfos/:id/article_infos',
          name: 'ArticleInfoTable',
          component (resolve) {
            require(['../pages/ArticleInfoTable.vue'], resolve)
          },
          meta: {menuName: 'WeChatInfo'}
        },
        {
          path: '/wechatinfos/:id/article_total_infos',
          name: 'ArticleTotalInfoTable',
          component (resolve) {
            require(['../pages/ArticleTotalInfoTable.vue'], resolve)
          },
          meta: {menuName: 'WeChatInfo'}
        },
        {
          path: '/wechatinfos/:id/seven_days_data',
          name: 'SevenDaysData',
          component (resolve) {
            require(['../pages/SevenDaysData.vue'], resolve)
          },
          meta: {menuName: 'WeChatInfo'}
        },
        {
          path: '/wechatinfos/:id/user_analyses',
          name: 'UserAnalyses',
          component (resolve) {
            require(['../pages/UserAnalyses.vue'], resolve)
          },
          meta: {menuName: 'WeChatInfo'}
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

router.beforeEach((to, from, next) => {
  // http response 拦截器 拦截 401错误
  axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.localStorage.removeItem('authorization')
          store.commit('SET_USER', { user: '' })
          axios.defaults.headers.common['Authorization'] = ''
          next('/login')
      }
    }
    return Promise.reject(error)   // 返回接口返回的错误信息
  })
  // 用户第一次进入
  let authorization = window.localStorage.getItem('authorization')
  // console.log(authorization)
  if (authorization === null && to.path !== '/login') {
    next('/login')
  }
  next()
})
export default router
