<template>
  <img alt="Vue logo" src="./assets/images/logo.png" />
  <router-view></router-view>
  <!-- <HelloWorld msg="👺Hello Vue 3.0 + Vite" /> -->
</template>

<script>
import { provideString } from "../plugin/string";
import { useMousePosition } from "./hoc/watchMouse";
export default {
  name: "App",
  setup() {
    // 全局注入插件或者变量
    provideString({
      tool1: "我是个 axios 封装",
      tool2: "我是个 lodash 封装",
      tool3: useMousePosition,
    });
  },
};
</script>
<style css>
/* 全局 主题色自定义变量 */
:root {
  --font-color: #0f9960;
}
</style>