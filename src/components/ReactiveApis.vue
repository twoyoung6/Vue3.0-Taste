<template>
  <div class="rect">
    <p>reactive API 演示</p>
    <!-- <input type="text" v-model="original.rect" /> -->
  </div>
</template>

<script>
import { reactive, readonly, watchEffect } from "vue";
const original = reactive({ rect: 0 });

const copy = readonly(original);
export default {
  created() {
    original++;
    watchEffect(() => {
      // works for reactivity tracking
      console.log("rect--", copy.rect);
    });
  },
};
</script>

<style>
</style>