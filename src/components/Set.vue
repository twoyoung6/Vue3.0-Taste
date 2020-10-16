<script>
import { h, ref, reactive, watchEffect } from "vue";

export default {
  props: {
    num: Number,
  },
  setup({ num }) {
    let count = ref(66); // ref(66) === { value: 66 }
    const object = reactive({ foo: "bar" });
    // 监听传入 props
    watchEffect(() => {
      console.log(`num is: ` + num); // Will not be reactive!
      // count = num;
    });

    return () => h("div", [count.value, object.foo]);
  },
};
</script>