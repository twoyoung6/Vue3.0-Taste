<template>
  <h2>{{ msg }}</h2>
  <em>部分还是采用 vue2.x 单文件组件 .vue 语法演示</em>
  <div class="line" id="teleport-id"></div>
  <div class="line">
    <van-button
      color="linear-gradient(to right, #d9822b, #0d8050)"
      size="normal"
      @click.prevent="count++"
    >
      count is: {{ count }}
    </van-button>
  </div>
  <div class="line">
    <p>
      <em>setup()</em> 函数组件内部使用Composition API的入口点，创建组件实例。
    </p>
    {{ count }} {{ object.foo }}
  </div>
  <!-- reactive 演示 -->
  <Reac class="line" :age="count">可乐</Reac>
  <!-- render 高阶组件演示 -->
  <SetVue class="line" :num="count" @change="toggleChange">
    <h5>子组件默认插槽展示内容{{ car }}</h5>
  </SetVue>
  <Compo>
    <b>当前鼠标位置：X：{{ x }}，Y：{{ y }}</b>
  </Compo>
  <teleport to="#teleport-id">
    <p>我是【内容移动内置组件】<em>teleport</em> 移动的内容</p>
    <img src="/images/laugh.gif" alt="laugh" />
  </teleport>
  <div class="line">
    <van-cell title="vant 分享面板" @click="showShare = true" icon="wechat" />
    <van-share-sheet
      v-model:show="showShare"
      :options="options"
      title="立即分享给好友"
      description="描述信息"
    />
  </div>
</template>

<script>
// 导入 鼠标监听模块
import { ref, reactive } from "vue";
import SetVue from "../hoc/Set.vue";
import { useMousePosition } from "../hoc/watchMouse";
import Compo from "../components/Compo.vue";
import Reac from "../components/Reac.vue";
export default {
  name: "HelloWorld",
  components: { SetVue, Compo, Reac },
  // setup 在 beforeCreate 挂钩之前被调用;
  setup(props, context) {
    console.log("import.meta", import.meta.env);
    const count = ref(0);
    const object = reactive({ foo: "bar", hoo: "hua" });

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
      car: "🚕",
    };
  },
  methods: {
    // SetVue 子组件 导出的事件
    toggleChange(object) {
      object.foo = object.foo == "😄" ? "😭" : "😄";
      this.car = this.car == "🚕" ? "🚲" : "🚕";
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
<style>
#teleport-id img {
  width: 120px;
  height: auto;
}
</style>
