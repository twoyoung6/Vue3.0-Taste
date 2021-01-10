// 通过 render 函数 h 创建的高阶组件，完全脱离（不需要） vue 实例 this 的调用
<script>
import { h, ref, reactive, watchEffect, toRefs } from "vue";

export default {
  setup(props, context) {
    const { attrs, slots, emit } = context;
    // ref：ref(66) === proxy{ value: 66 } Proxy 封装的基础数据类型对象
    let count = ref(66);
    // reactive：Proxy 封装的 复杂数据类型 （对象、数组）,reactive({ foo: "😄" }) === proxy({ foo: "😄" })
    const object = reactive({ foo: "😄" });
    // toRefs 深度转化 复杂数据类型的 响应式属性， toRefs(object) === proxy({ foo: proxy({ value: "😄" }) })
    // toRef const foo = toRef(object, "foo")
    // 监听传入 props
    watchEffect(() => {
      console.log(`num is: ` + attrs.num); // Will not be reactive!
      count.value = attrs.num;
    });

    // 导出点击切换事件
    function toggleChange() {
      emit("change", object);
    }
    // h：vue 的 render 函数的 h 构造函数，生成 虚拟 DOM;
    // 类似于 Vue2.0中 render 方法的参数 createElement
    return () =>
      h("div", { class: "counter-display", onClick: toggleChange }, [
        h("em", "render"),
        ` 函数创建的高阶组件：${[count.value, object.foo]}`,
        h("span", slots.default()),
      ]);
  },
};
</script>