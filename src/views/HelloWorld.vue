<template>
  <h2>{{ msg }}</h2>
  <em>部分还是采用 vue2.x 单文件组件 .vue 语法演示</em>
  <div class="line">
    <van-button
      color="linear-gradient(to right, #d9822b, #0d8050)"
      size="normal"
      @click.prevent="count++"
    >
      count is: {{ count }}
    </van-button>
  </div>
  <!-- reactive 演示 -->
  <Reactive class="line" :age="count">可乐</Reactive>
  <div class="line">
    <van-cell title="vant 分享面板" @click="showShare = true" icon="wechat" />
    <van-share-sheet
      v-model:show="showShare"
      :options="options"
      title="立即分享给好友"
      description="描述信息"
    />
  </div>
  <div class="line" id="teleport-id"></div>
  <!-- render 高阶组件演示 -->
  <SetVue class="line" :num="count" @change="toggleChange">
    <h5>子组件默认插槽展示内容{{ car }}</h5>
  </SetVue>
  <teleport to="#teleport-id">
    <p>我是【内容移动内置组件】<em>teleport</em> 移动的内容</p>
    <img src="../../public/images/laugh.gif" alt="LOGO" />
  </teleport>
  <div class="line">
    <p>
      <em>setup()</em> 函数组件内部使用Composition API的入口点，创建组件实例。
    </p>
    {{ count }} {{ object.foo }}
  </div>
  <Compsition>
    <b>当前鼠标位置：X：{{ x }}，Y：{{ y }}</b>
  </Compsition>
</template>

<script>
// 导入 鼠标监听模块
import { ref, reactive } from "vue";
import SetVue from "../hoc/Set.vue";
import { useMousePosition } from "../hoc/watchMouse";
import Compsition from "../components/Compsition.vue";
import Reactive from "../components/Reactive.vue";
export default {
  name: "HelloWorld",
  components: { SetVue, Compsition, Reactive },
  setup(props, context) {
    // 在beforeCreate挂钩之前被调用
    // ref API 直接创建 基础数据类型 的 可变性引用【为了将反应性值作为变量传递，而不必依赖对的 this 的访问】
    // 原理是 将基础数据类型 0 处理成 用 Proxy 的封装，ref(0) === { value: 0 }
    const count = ref(0);
    const object = reactive({ foo: "bar" });

    const { x, y } = useMousePosition();
    // expose to template
    return {
      count,
      object,
      x,
      y,
    };
  },
  props: {
    msg: String,
  },
  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link", description: "描述信息" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      car: "🚂",
    };
  },
  methods: {
    // SetVue 子组件 导出的事件
    toggleChange(object) {
      object.foo = object.foo == "😄" ? "😭" : "😄";
      this.car = this.car == "🚂" ? "🚕" : "🚂";
    },
  },
  created() {
    this.$watch(
      "count",
      (newVal, oldVal) => {
        console.log(`newVal--${newVal}`, `oldVal--${oldVal}`);
      },
      { deep: true, flush: "sync" }
    );
  },
  mounted() {
    console.log("globalProperties---", this.$http);
  },
};
</script>
