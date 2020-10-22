import { createRouter, createWebHashHistory } from 'vue-router'
const HelloWorld = () => import(/* webpackChunkName: "HelloWorld" */ "../components/HelloWorld.vue");
const Compsition = () => import(/* webpackChunkName: "Compsition" */ "../components/Compsition.vue");
const Set = () => import(/* webpackChunkName: "Set" */ "../components/Set.vue");

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
      path: '/compsition',
      name: 'Compsition',
      component: Compsition
    }, {
      path: '/set',
      name: 'Set',
      component: Set
    }]
})
