<template>
  <div><em>reactive</em>{{ obj.name }} <slot></slot> 今年 {{ age }}岁</div>
</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  name: "Reactive",
  setup(props, context) {
    const { attrs } = context;
    // 注意事项！！！: reactive 的对象不可以解构返回或导入, 会导致失去响应式
    const obj = reactive({
      name: "大金毛",
      age: 4,
    });
    function addObj() {
      obj.age++;
    }
    return {
      ...obj, // 这样写不好, 里面会失去响应式
      obj, // 这样写那么外面就要都基于obj 来调取, 类型{{ obj.age }}
      ...toRefs(obj), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的obj也可以响应
    };
  },
};
</script>
