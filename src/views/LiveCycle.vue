<template>
  <div>
    <div>
      <van-button
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        @click="add"
        >点击增加, 触发updata</van-button
      >
      <div>
        <b>{{ obj.count }}</b>
      </div>
    </div>
    <b>2.x与 3.0的<em>生命周期</em>对照：</b>
    <table>
      <thead>
        <th>vue2.x</th>
        <th>change</th>
        <th>vue3.0</th>
      </thead>
      <tbody>
        <tr v-for="(trItem, index) in tableData" :key="index">
          <td>{{ trItem.two }}</td>
          <td>→</td>
          <td>{{ trItem.three }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//这些生命周期注册方法只能用在 setup 钩子中
import { onMounted, onUpdated, onBeforeUnmount, reactive, ref } from "vue";
export default {
  name: "LiveCycle",
  // 1: setup显得冗长, 可以自己动手做一些插件来优化
  // 2: 本身更加明确意图
  // 3: 需要树立工程师的正确代码意识
  // 4: 能力不足可能会写出更差的代码
  // 作者说: 提升上界的收益远远大于降低下界的损失。值得深思, 前端需要提高门槛
  // 5: 调用时机: 创建组件实例，然后初始化 props ，紧接着就调用setup 函数。从生命周期钩子的视角来看，它会在 beforeCreate 钩子之前被调用
  // 6: 这些生命周期钩子注册函数只能在 setup() 期间同步使用， 因为它们依赖于内部的全局状态来定位当前组件实例（正在调用 setup() 的组件实例）, 不在当前组件下调用这些函数会抛出一个错误。
  // 7: 原则上生命周期里面不会放具体的逻辑,哪怕只有一句赋值一个三元都不可放, 这也正好符合当前的工程模式

  // 讨论: 有多少种方式, 可以判断出某个函数 当前处于哪个函数?
  //       比如有多层嵌套的组件是否有影响
  setup(props, context) {
    const tableData = ref([
      {
        two: "beforeCreate",
        three: "使用 setup()",
      },
      {
        two: "created",
        three: "使用 setup()",
      },
      {
        two: "beforeMount",
        three: "onBeforeMount",
      },
      {
        two: "mounted",
        three: "onMounted",
      },
      {
        two: "beforeUpdate",
        three: "onBeforeUpdate",
      },
      {
        two: "updated",
        three: "onUpdated",
      },
      {
        two: "beforeDestroy",
        three: "onBeforeUnmount",
      },
      {
        two: "destroyed",
        three: "onUnmounted",
      },
      {
        two: "errorCaptured",
        three: "onErrorCaptured",
      },
    ]);
    onMounted(() => {
      console.log("is mounted!");
    });
    onUpdated(() => {
      console.log("is onUpdated!");
    });
    onBeforeUnmount(() => {
      console.log("is onBeforeUnmount!");
    });
    const obj = reactive({
      count: 1,
    });
    function add() {
      obj.count++;
    }
    return {
      obj,
      add,
      tableData,
    };
  },
};
</script>
<style lang="css">
p {
  text-align: left;
  vertical-align: middle;
}
table {
  width: 100%;
  margin-top: 20px;
}
table thead {
  color: #fff;
  background: var(--font-color);
}
thead th {
  height: 40px;
}
tr td {
  height: 28px;
}
table tr:nth-child(odd) {
  background-color: rgb(245, 241, 225);
}
table tr:nth-child(even) {
  background-color: rgb(243, 232, 232);
}
</style>
