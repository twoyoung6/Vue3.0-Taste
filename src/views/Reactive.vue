<template>
  <div>
    <div class="tag" ref="refNode">
      响应式 API：
      <em>ref</em><em>reactive</em><em>toRef</em><em>toRefs</em>
      <em>shallowReactive</em><em>shallowRef</em><em>triggerRef</em>
    </div>
    <!-- ref 获取 DOM -->
    <van-cell
      :ref="
        (el) => {
          itemsNode[index] = el;
        }
      "
      v-for="(item, index) in 3"
      :key="item"
      icon="audio"
      title="ref dom"
      :value="item"
      label="ref 获取 DOM 演示"
    >
    </van-cell>
    <div>{{ name }} 可乐 今年 {{ age }}岁</div>
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
import {
  ref,
  reactive,
  toRefs,
  toRef,
  shallowRef,
  shallowReactive,
  onMounted,
  triggerRef,
} from "vue";
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
    const dogToRefs = toRefs(obj);
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

    // 5.0 =========shallowRef============
    // stateShallo.value 整个值重新赋值了，视图就才会更新，只修改 stateShallo.value.first.b = 3 不会触发试图更新；
    // 不过可以借助 triggerRef 来主动触发更新，triggerRef(stateShallo)
    const shallo = {
      a: 1,
      first: {
        b: 2,
        second: {
          c: 3,
        },
      },
    };
    const stateShallo = shallowRef(shallo);
    // 只改变内层
    function change1() {
      stateShallo.value.first.b = 8;
      stateShallo.value.first.second.c = 9;
      // 修改值后立即驱动视图更新
      triggerRef(stateShallo);
      console.log(stateShallo);
    }
    // .value 整体赋值;
    function change2(params) {
      stateShallo.value = {
        a: 1,
        first: {
          b: 8,
          second: {
            c: 9,
          },
        },
      };
    }

    // 6.0 模板 ref 获取 DOM
    const refNode = ref(null);
    const itemsNode = ref([]);
    onMounted(() => {
      console.log("ref 获取 DOM---", refNode.value, itemsNode.value[0]);
    });
    return {
      ...obj, // 这样写不好, 里面会失去响应式
      obj, // 这样写那么外面就要都基于obj 来调取, 类型{{ obj.age }}
      ...dogToRefs, // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的obj也可以响应
      ageRef,
      ageToRef,
      addObj,
      addRef,
      addToref,
<<<<<<< HEAD:src/views/Reac.vue
      state,
      changeA,
=======
      refNode,
      itemsNode,
      stateShallo,
      state,
>>>>>>> e2e97612ef429ed9d77ff25bfa06eeb3c78086fa:src/views/Reactive.vue
    };
  },
};
</script>
<style scoped>
.tag {
  flex-wrap: wrap;
  display: inline-flex;
  justify-content: center;
}
.van-button {
  margin: 10px auto;
  display: block;
}
</style>
