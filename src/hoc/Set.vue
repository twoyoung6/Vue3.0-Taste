// 通过 render 函数 h 创建的高阶组件，完全脱离（不需要） vue 实例 this 的调用
<script>
import { h, ref, reactive, watchEffect } from "vue";

export default {
  props: {
    num: Number,
  },
  setup({ num }) {
    // ref：ref(66) === { value: 66 } Proxy 封装的基础数据类型对象
    let count = ref(66);
    // reactive：Proxy 封装的 复杂数据类型 （对象、数组）
    const object = reactive({ foo: "bar" });
    // 监听传入 props
    watchEffect(() => {
      console.log(`num is: ` + num); // Will not be reactive!
      // count.value = num;
    });
    // h：vue 的 render 函数的 h 构造函数，生成 虚拟 DOM;
    // 类似于 Vue2.0中 render 方法的参数 createElement
    return () =>
      h(
        "div",
        { class: "counter-display" },
        `render 函数创建的组件：${[count.value, object.foo]}`
      );
  },
};
</script>