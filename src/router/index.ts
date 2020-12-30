import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import todoList from "../views/todoList.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "todoList",
    component: todoList
  },
  // {
  //   path: "/addTodo/:id/:index",
  //   name: "addTodo",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/addTodo.vue")
  // },
  {
    path: "/archiveTodo",
    name: "archiveTodo",
    component: () => import("../views/archiveTodo.vue")
  },
  {
    path: "/smallGoals",
    name: "smallGoals",
    component: () => import("../views/smallGoals.vue")
  },
  {
    path: "/recycle",
    name: "recycle",
    component: () => import("../views/recycle.vue")
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("../views/setting.vue")
  },
  {
    path: "/map",
    name: "map",
    component: () => import("../views/map.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
