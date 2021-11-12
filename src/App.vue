<template>
<<<<<<< HEAD
  <div>
    <img alt="Vue logo" src="/images/logo.png" />
    <router-view></router-view>
    <!-- <HelloWorld msg="👺Hello Vue 3.0 + Vite" /> -->
  </div>
=======
  <!-- <img alt="Vue logo" src="./assets/images/logo.png" /> -->
  <van-grid clickable :column-num="4">
    <van-grid-item
      v-for="(item, index) in routes"
      :icon="icon(index)"
      :text="item.name"
      :to="item.path"
      :key="index"
    />
  </van-grid>
  <router-view></router-view>
  <!-- <HelloWorld msg="👺Hello Vue 3.0 + Vite" /> -->
>>>>>>> e2e97612ef429ed9d77ff25bfa06eeb3c78086fa
</template>

<script>
import { provideString } from "./plugin/string";
import { useMousePosition } from "./hoc/watchMouse";
import router from "./router";
export default {
  name: "App",
  setup() {
    const icons = [
      "home-o",
      "fire-o",
      "gem-o",
      "music-o",
      "points",
      "balance-o",
      "smile-o",
      "exchange",
    ];
    const routes = router.getRoutes().map((val) => {
      return {
        name: val.meta.name,
        path: val.path,
      };
    });
    let icon = function (index) {
      return icons[index];
    };
    // 全局注入插件或者变量
    provideString({
      tool1: "我是个 axios 封装",
      tool2: "我是个 lodash 封装",
      tool3: useMousePosition,
    });

    return {
      routes,
      icon,
    };
  },
};
</script>
<style css>
/* 全局 主题色自定义变量；将声明添加到:root伪类来使它们全局可用，以便所有其他选择器都可以继承它 */
:root {
  --font-color: #0f9960;
}
</style>