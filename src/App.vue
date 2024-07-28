<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script lang="ts">
import Navigation from "@/components/Navigation.vue";

export default {
  components: {
    Navigation,
  },
  setup() {},
};
</script>
<style>
html.dark {
  color-scheme: dark;
}
body {
  @apply bg-[white] text-slate-800 dark:bg-[#181A1B] dark:text-[#DDDDDD];
}
</style>
