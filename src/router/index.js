import { createRouter, createWebHashHistory } from 'vue-router'
const HelloWorld = () => import(/* webpackChunkName: "HelloWorld" */ "../views/HelloWorld.vue");
const LiveCycle = () => import(/* webpackChunkName: "LiveCycle" */ "../views/LiveCycle.vue");
const TodoList = () => import(/* webpackChunkName: "TodoList" */ "../views/TodoList.vue");
const VuexShow = () => import(/* webpackChunkName: "VuexShow" */ "../views/VuexShow.vue");


// 在 Vue-router新版本中，需要使用createRouter来创建路由
export default createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/live-cycle',
      name: 'LiveCycle',
      component: LiveCycle
    }, {
      path: '/todo-list',
      name: 'TodoList',
      component: TodoList
    }, {
      path: '/vuex-show',
      name: 'VuexShow',
      component: VuexShow
    }]
})
