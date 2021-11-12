// 通过 render 函数 h 创建的高阶组件，完全脱离（不需要） vue 实例 this 的调用
<script>
import { h, ref, reactive } from "vue";

export default {
  setup(props, context) {
    let { attrs, slots, emit } = context;
    // ref：ref(66) === reactive({ value: 66 }) === proxy({ value: 66 }) Proxy 封装的基础数据类型对象
    // 监听传入 props，让 传入的 props 变成响应式；
    let count = reactive(attrs);
    // reactive：Proxy 封装的 复杂数据类型 （对象、数组）,reactive({ foo: "😄" }) === proxy({ foo: "😄" })
    const object = reactive({ foo: "😄" });

    // 导出点击切换事件(父子组建通信)
    function toggleChange() {
      emit("change", object);
    }
    // h：vue 的 render 函数的 h 构造函数，生成 虚拟 DOM;
    // 类似于 Vue2.0中 render 方法的参数 createElement
    return () =>
      h("div", { class: "counter-display", onClick: toggleChange }, [
        h("div", [h("em", "render 函数"), h("em", "h 函数")]),
        `函数创建的高阶组件：${count.num}------${object.foo}`,
        h("span", slots.default()),
      ]);
  },
};
</script>