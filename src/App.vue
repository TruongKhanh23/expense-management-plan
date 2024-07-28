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
