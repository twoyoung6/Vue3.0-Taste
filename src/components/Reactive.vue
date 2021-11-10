<template>
  <div>
    <div class="tag">
      <em>ref</em><em>reactive</em><em>toRef</em><em>toRefs</em>
      <em>shallowReactive</em><em>shallowRef</em>
    </div>
    <div>{{ name }} <slot></slot> 今年 {{ age }}岁</div>
    <van-button type="info" size="mini" @click="addObj">
      obj age: {{ obj.age }}
    </van-button>
    <!-- ref 将 复杂数据类型转化响应式 -->
    <van-button
      color="linear-gradient(to right, #db3737, #182026)"
      size="mini"
      @click="addRef"
    >
      ageRef is: {{ ageRef }}
    </van-button>
    <!-- toRef 将 复杂数据类型转化响应式 -->
    <van-button
      color="linear-gradient(to right, #137cbd, #0f9960)"
      size="mini"
      @click="addToref"
    >
      ageToRef is: {{ ageToRef }}
    </van-button>
    <div class="line">
      <span>shallowReactive演示：</span>
      <span>{{ state.a }}{{ state.first.b }}{{ state.first.second.c }}</span>
      <van-button
        color="linear-gradient(to right, #137cbd, #0f9960)"
        size="mini"
        @click="changeA"
        >changeA
      </van-button>
    </div>
  </div>
</template>
<script>
import { ref, reactive, toRefs, toRef, shallowRef, shallowReactive } from "vue";
export default {
  name: "Reactive",
  setup(props, context) {
    // ==========1.0 使用建议：==========
    // 基本类型值（String 、Nmuber 、Boolean 等）或单值对象（类似像 {count: 3} 这样只有一个属性值的对象）使用 ref
    // 引用类型值（Object 、Array）使用 reactive

    // ==========2.0 ref 和 reactive 区别==========
    // ref API 直接创建数据的可变性引用【为了将反应性值作为变量传递，而不必依赖对的 this 的访问】;
    // 原理是 将基础数据类型 0 处理成 用 Proxy 的封装;
    // ref 就是通过 reactive 包装了一个对象 ，然后是将值传给该对象中的 value 属性，这也就解释了为什么每次访问时我们都需要加上 .value
    // ref(0) === reactive({ value: 0 }) === proxy({ value: 0 });
    const count = ref(0);
    const dog = {
      name: "大金毛",
      age: 3,
    };
    // ==========3.0 ref、reactive 与 toRef 、toRefs的区别==========

    // 注意事项！！！: reactive 的对象不可以解构返回或导入, 会导致失去响应式
    const obj = reactive(dog);
    // 3.1 ref  都是对传入数据的拷贝（隔离）；
    const ageRef = ref(dog.age);
    // 3.2 reactive、toRef、toRefs 是对传入数据的引用，改变 新值会影响 原值；
    const ageToRef = toRef(dog, "age");
    // 3.3 toRefs 深度转化 复杂数据类型的 响应式属性；
    // toRefs(dog) === proxy({ age: proxy({ value: 3 }), name: proxy({ value: "大金毛" }) })
    const dogToRefs = toRefs(dog);
    function addObj() {
      obj.age++;
      console.log(`原值：${dog.age}====reactive：${obj.age}`);
    }
    function addRef() {
      ageRef.value++;
      console.log(`原值：${dog.age}====ageRef：${ageRef.value}`);
    }
    function addToref() {
      ageToRef.value++;
      console.log(`原值：${dog.age}====ageToRef：${ageToRef.value}`);
    }

    // 4.0 =========shallowReactive============
    // shallowReactive 用于 reactive 的性能处理，此API并不会像 reactive 一样对每一层处理成 Proxy，而只处理第一层；
    // 监听第一层属性的值 data.a 的值，一旦发生改变，则更新视图；
    // 也就是第一层数据 data.a 才是响应式的，只有当 data.a 改变，才会会刷新obj 数据渲染的整个视图；
    // 当 data.a 未更新，即使 data.a.first.b 或者 data.a.first.second.c 发生数据改变，视图也不会更新；
    const data = {
      a: 1,
      first: {
        b: 2,
        second: {
          c: 3,
        },
      },
    };
    const state = shallowReactive(data);
    function changeA(params) {
      state.a = 4;
    }

    return {
      ...obj, // 这样写不好, 里面会失去响应式
      obj, // 这样写那么外面就要都基于obj 来调取, 类型{{ obj.age }}
      ...dogToRefs, // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的obj也可以响应
      ageRef,
      ageToRef,
      addObj,
      addRef,
      addToref,
      state,
      changeA,
    };
  },
};
</script>
<style scoped>
.tag {
  flex-wrap: wrap;
}
.van-button {
  margin: 4px 0;
}
</style>
