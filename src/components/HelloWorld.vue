<template>
  <h1>{{ msg }}</h1>
  <van-button type="primary" size="normal" @click="count++">
    count is: {{ count }}
  </van-button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <van-cell title="显示分享面板" @click="showShare = true" icon="wechat" />
  <van-share-sheet
    v-model:show="showShare"
    :options="options"
    title="立即分享给好友"
    description="描述信息"
  />
</template>

<script>
export default {
  name: "HelloWorld",
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
  mounted() {
    console.log("globalProperties---", this.$http);
  },
};
</script>
