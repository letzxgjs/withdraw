import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Login from '@/components/login'
import Register from '@/components/register'
import ForgetPassword from '@/components/forget-password'
import Home from '@/components/home'
import AccountDetails from '@/views/account-details'
import Personal from '@/views/personal'
import Withdraw from '@/views/withdraw'
import ModifyName from '@/views/modify-name'
import ModifyMobile from '@/views/modify-mobile'
import ModifyPassword from '@/views/modify-password'
import HistoricalQuiz from '@/views/historical-quiz'
import Message from '@/views/message'
import { getToken, setToken } from '@/libs/utils'
Vue.use(Router)
const LOGIN_PAGE_NAME = 'login'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      redirect: { name: 'home' },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          beforeEnter(to, from, next) {
            let token = getToken();
            if (token) {
              next()
            } else {
              next({
                name: 'login'
              })
            }
          }
        },
      ],
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: ForgetPassword
    },
    {
      path: '/account-details',
      name: 'account-details',
      component: AccountDetails
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/modify-name',
      name: 'modify-name',
      component: ModifyName
    },
    {
      path: '/modify-password',
      name: 'modify-password',
      component: ModifyPassword
    },
    {
      path: '/modify-mobile',
      name: 'modify-mobile',
      component: ModifyMobile
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw
    },
    {
      path: '/historical-quiz',
      name: 'historical-quiz',
      component: HistoricalQuiz
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
  ]
})
// router.beforeEach((to, from, next) => {
//   const token = getToken()
//   if (to.name == LOGIN_PAGE_NAME || to.name == 'register' || to.name == 'forget-password') {
//     next()
//     return
//   }
//   if (!token && to.name !== LOGIN_PAGE_NAME) {
//     // 未登录且要跳转的页面不是登录页
//     next({
//       name: LOGIN_PAGE_NAME // 跳转到登录页
//     })
//   } else if (!token && to.name === LOGIN_PAGE_NAME) {
//     // 未登陆且要跳转的页面是登录页
//     next() // 跳转
//   } else if (token && to.name === LOGIN_PAGE_NAME) {
//     // 已登录且要跳转的页面是登录页
//     next({
//       name: 'home' // 跳转到homeName页
//     })
//   } else {
//     if (store.state.user.username) {
//       next()
//     } else {
//       store.dispatch('handleUserInfo').then(user => {
//         next()
//       }).catch(() => {
//         setToken('')
//         next({
//           name: 'login'
//         })
//       })
//     }
//   }
// })
export default router
