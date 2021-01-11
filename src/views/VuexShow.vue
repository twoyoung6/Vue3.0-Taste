<template>
  <div>
    <em>Vuex 的演示</em>
    <p>{{ name }}</p>
    <van-button @click="updateName('+')">点击改变名字</van-button>
    <br />
    <van-button @click="deferName('+')">改回来</van-button>

    <p>{{ fullName }}</p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "VuexShow",
  setup() {
    const store = useStore();
    // 1: 单个引入
    const name = computed(() => store.state.name);
    // 2: 引入整个state
    const state = computed(() => store.state);
    console.log("vuex的实例", state.value); // 别忘了.value

    // 3: 方法其实就直接从本体上取下来了
    const updateName = (newName) => store.commit("updateName", newName);

    // 4: action一个意思
    const deferName = () => store.dispatch("deferName");

    // 5: getter 没变化
    const fullName = computed(() => store.getters.fullName);
    return {
      name,
      fullName,
      deferName,
      updateName,
    };
  },
};
</script>