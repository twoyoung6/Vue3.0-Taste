<template>
  <div class="line">
    <p><em>Composition API</em> 演示</p>
    <p style="font-size: 12px; text-align: left">
      Composition API为我们提供了更为灵活并且模块化的代码组织结构。 <br />
      1.可以将代码组织为每个函数都处理特定功能的函数，而不必总是通过选项来组织代码。<br />
      2. 使在组件之间，甚至外部组件之间，提取和重用逻辑变得更加简单。
    </p>
    <van-button type="danger" size="mini" @click="increment" round>
      Mount is: {{ state.mount }}, double is: {{ state.double }}
    </van-button>
    <slot></slot>
  </div>
</template>

<script>
import { reactive, computed, watch } from "vue";

export default {
  props: {
    position: {
      type: Object,
      default: {},
    },
  },
  setup() {
    // 🍖 reactive 创建反应性对象【当反应状态更改时，视图会自动更新】
    const state = reactive({
      mount: 0,
      double: computed(() => state.mount * 2), // 计算属性，mount 更新，double随之更新🎃
    });
    watch(() => {
      console.log(
        `watching：mount is ${state.mount}，double is ${state.double}`
      );
    });
    function increment() {
      state.mount++;
    }

    return {
      state,
      increment,
    };
  },
};
</script>
