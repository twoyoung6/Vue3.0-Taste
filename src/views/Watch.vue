<template>
  <div class="watch-demo">
    <van-button icon="chart-trending-o" type="info" @click="addn1">
      n1增加--{{ n1 }}
    </van-button>
    <van-button icon="brush-o" @click="addn2"> n2增加--{{ n2 }} </van-button>
    <van-button icon="play-circle-o" type="warning" @click="addn3">
      n3增加--{{ n3 }}
    </van-button>
    <van-button icon="info" type="info" @click="stopWatch">
      停止 n2 和 n3 的监听
    </van-button>
  </div>
</template>

<script>
import { watch, ref } from "vue";
export default {
  setup() {
    const n1 = ref(1);
    const n2 = ref(1);
    const n3 = ref(1);
    // 1: 监听一个
    // 第一个参数是函数返回值, 当然也可以 直接写n1
    // 如果监听的是一个对象里面的某个属性, 那就需要这种函数的写法了, 比2.x的字符串写法高明很多

    watch(
      () => n1.value, // 或者直接写 'n1'
      (val, oldVal) => {
        console.log("新值", val);
        console.log("老值", oldVal);
      }
    );
    // 2: 监听多个
    // 数组的形式定义多个, 这就出现问题了吧, 如果我观察的对象就是个数组, 并且每一项都是一个返回值的函数, 岂不是会被他误认为是多监控的结构, 苦恼
    const watchN = watch(
      [() => n2.value, () => n3.value],
      ([curN2, curN3], [oldN2, oldN3]) => {
        // curN2 是 n2的新值   oldN2 是 n2的老值
        // curN3 是 n3的新值  oldN3 是 n3的老值
        console.log(`n2 新值 ${curN2} 与 老值 ${oldN2}`);
        console.log(`n3 新值 ${curN3} 与 老值 ${oldN3}`);
      }
    );

    function addn1() {
      n1.value++;
    }
    function addn2() {
      n2.value++;
    }
    function addn3() {
      n3.value++;
    }
    // 停止监听函数
    function stopWatch(params) {
      watchN();
    }
    return {
      addn1,
      addn2,
      addn3,
      n1,
      n2,
      n3,
      stopWatch,
    };
  },
};
</script>
<style lang="css" scoped>
/* /deep/ and >>> 已经被弃用，请使用 ::v-deep() */
.watch-demo ::v-deep(.van-button) {
  display: block;
  margin: 20px auto;
}
</style>