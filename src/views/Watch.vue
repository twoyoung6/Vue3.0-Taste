<template>
  <div class="watch-demo">
    <em>watch</em><em>watchEffect</em> 的演示
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
    <em>watchEffect</em>
    <van-cell>
      n4：<span>{{ n4 }}</span> = n1：<span>{{ n1 }}</span> + n2：
      <span>{{ n2 }} </span>
      + n3：<span>{{ n3 }} </span>
    </van-cell>
    <li>
      <em>watchEffect</em>
      立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数，区别于
      <em>watch</em>
      更像是一个 计算函数 <em>computed</em> ;
    </li>
    <li>侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止;</li>
    <li>
      Vue的响应式系统会缓存副作用函数，并异步地刷新它,
      比如同时改变了n1与n2、n3此时watchEffect 只是执行一次;
    </li>
    <li>初始化运行是在组件 mounted 之前执行的 无法访问 DOM（或模板 ref）；</li>
    <li>
      并不是返回值也没有返回值,而是监听里面所有的值, 任何有变化都会重新执行。
    </li>
  </div>
</template>

<script>
import { watch, ref, watchEffect } from "vue";
export default {
  setup() {
    const n1 = ref(1);
    const n2 = ref(1);
    const n3 = ref(1);
    let n4 = ref(0);
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
    // watchEffect 立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数，区别于 watch 更像是一个 计算函数 computed ;
    // 侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止;
    // Vue 的响应式系统会缓存副作用函数，并异步地刷新它, 比如同时改变了n1与n2、n3此时 watchEffect 只是执行一次;
    // 初始化运行是在组件 mounted 之前执行的 无法 访问 DOM（或模板 ref）；
    // 并不是返回值也没有返回值, 而是监听里面所有的值, 任何有变化都会重新执行。
    watchEffect(() => {
      n4.value = n1.value + n2.value + n3.value;
    });

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
      n4,
      stopWatch,
    };
  },
};
</script>
<style lang="css" scoped>
/* /deep/ and >>> 已经被弃用，请使用 ::v-deep() */
.watch-demo {
  padding-bottom: 20px;
}
.watch-demo ::v-deep(.van-button) {
  display: block;
  margin: 20px auto;
}
.watch-demo ::v-deep(.van-cell) {
  font-size: 18px;
}
.watch-demo ::v-deep(.van-cell) span {
  background: tomato;
  color: #fff;
  font-weight: bolder;
  padding: 2px 3px;
}
li {
  text-align: left;
}
</style>