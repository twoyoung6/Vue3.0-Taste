<template>
  <h2>{{ msg }}</h2>
  <em>均采用单文件组件语法 .vue 演示</em>
  <div class="line">
    <van-button type="primary" size="normal" @click.prevent="count++">
      count is: {{ count }}
    </van-button>
    <p>
      Edit <code>components/HelloWorld.vue</code> to test hot module
      replacement.
    </p>
  </div>
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
  <setVue class="line" :num="count"></setVue>
  <teleport to="#teleport-id">
    <p>我是【内容移动内置组件】<em>teleport</em> 移动的内容</p>
    <img src="../assets/laugh.gif" alt="LOGO" />
  </teleport>
  <!-- <ReactiveApis class="line"></ReactiveApis> -->
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
import { useMousePosition } from "../hoc/watchMouse.js";
import { ref, reactive } from "vue";
import setVue from "./Set.vue";
import ReactiveApis from "./ReactiveApis.vue";
import Compsition from "./Compsition.vue";
export default {
  setup() {
    // 在beforeCreate挂钩之前被调用
    // refAPI 直接创建普通的 可变性引用【为了将反应性值作为变量传递，而不必依赖对的 this 的访问】
    // ref(0) === { value: 0 }
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
  name: "HelloWorld",
  components: { setVue, ReactiveApis, Compsition },
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link", description: "描述信息" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  methods: {},
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
