import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import signIn from '../views/SignIn.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [{
  path: '/', // 默认路径
  name: 'signIn',
  component: signIn
}, {
  path: '/signUp', // 默认路径
  name: 'signUp',
  component: () => import('../views/SignUp.vue')
}, {
  path: '/myLife', // 默认路径
  name: 'myLife',
  component: () => import('../views/myLife.vue'),
  children: [{
    path: '/homePage',
    name: 'homePage',
    component: () => import('../views/myLife/homePage.vue')
  }, {
    path: '/smallGoals',
    name: 'smallGoals',
    component: () => import('../views/myLife/smallGoals.vue')
  }, {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/myLife/setting.vue')
  }, {
    path: '/taskPage',
    name: 'taskPage',
    component: () => import('../views/myLife/home/taskPage.vue')
  }, {
    path: '/todoPage',
    name: 'todoPage',
    component: () => import('../views/myLife/home/todoPage.vue')
  }, {
    path: '/spacePage',
    name: 'spacePage',
    component: () => import('../views/myLife/home/space/spacePage.vue')
  }, {
    path: '/goodsPage',
    name: 'goodsPage',
    component: () => import('../views/myLife/home/goodsPage.vue')
  }, {
    path: '/notePage',
    name: 'notePage',
    component: () => import('../views/myLife/home/notePage.vue')
  }],
}, {
  path: '/todoList',
  name: 'todoList',
  component: () => import('../views/todoList.vue')
}, {
  path: '/archiveTodo',
  name: 'archiveTodo',
  component: () => import('../views/archiveTodo.vue')
}]

// {
//   path: '/addTodo/:id/:index',
//   name: 'addTodo',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: 'about' */ '../views/addTodo.vue')
// },
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
