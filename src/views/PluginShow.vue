// 插件新思路演示
<template>
  <div>
    <em>plugin（provide / inject）</em>
    <div>插件新思路的演示</div>
    <p>{{ tool1 }}</p>
    <p>{{ store.tool2 }}</p>
    <p>
      鼠标位置监听插件： x: <span>{{ x }}</span> y:
      <span>{{ y }}</span>
    </p>
  </div>
</template>

<script>
import { useString } from "../plugin/string";
export default {
  name: "PluginShow",
  setup() {
    // 局部调用 插件或者变量
    const store = useString(); // 整体引入
    let { tool1, tool2 } = useString(); // 单个解构引入
    console.log(tool1, tool2, store);
    let { x, y } = store.tool3();

    return {
      tool1,
      tool2,
      store,
      x,
      y,
    };
  },
};
</script>

<style scoped>
span {
  color: var(--font-color);
}
</style>