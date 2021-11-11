<template>
  <div>
    <section>
      <p class="text">我是 css 访问 js 定义样式的示例</p>
      <p class="info">css 绑定 js中定义的样式数据</p>
      <van-button type="info" plain round size="small" @click="change1">
        点我切换样式
      </van-button>
    </section>
    <section>
      <p :class="classes.title">（style module）我是 js 访问 css 类的示例</p>
      <p class="info">js 中获取style中定义的样式类</p>
      <div :class="$style.content">DOM中默认通过 $style 对象访问</div>
      <div :class="classes.content">自定义 module 注入 classes 对象访问</div>
      <van-button type="info" plain round size="small" @click="change2">
        点我切换样式
      </van-button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: {
        color: "red",
        size: "14px",
        spacing: "3px",
        weight: "600",
      },
    };
  },
  methods: {
    // css 绑定 js中定义的样式数据
    change1() {
      this.theme =
        this.theme.color == "blue"
          ? {
              color: "red",
              fontSize: "14px",
              spacing: "3px",
              weight: "600",
            }
          : {
              color: "blue",
              fontSize: "18px",
              spacing: "0px",
              weight: "400",
            };
      console.log(this.theme);
    },
    change2() {
      console.log(this.$style, this.classes);
      // 似乎只能获取到模块名称，无法获取到具体样式细节
    },
  },
};
</script>

<style>
section {
  background: #fff;
  padding: 15px 5px;
  box-sizing: border-box;
  margin: 10px 0;
}
.text {
  color: v-bind("theme.color");
  letter-spacing: v-bind("theme.spacing");
  font-size: v-bind("theme.fontSize");
  font-weight: v-bind("theme.weight");
  transition: all ease 0.6s;
}
.info {
  font-size: 10px;
  color: #666;
  margin: 5px 0;
  font-weight: 600;
}
</style>
<style module>
.content {
  color: rgb(94, 3, 38);
  margin: 10px 0;
}
</style>
// 自定义 module
<style module="classes">
.title {
  color: red;
  size: 14px;
  font-weight: 600;
}
.content {
  color: rgb(94, 3, 38);
  margin: 10px 0;
}
</style>
