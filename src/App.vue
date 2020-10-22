<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-view></router-view>
  <!-- <HelloWorld msg="👺Hello Vue 3.0 + Vite" /> -->
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>