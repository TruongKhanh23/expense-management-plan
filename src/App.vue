<template>
  <div id="app">
    <Navigation v-if="isLoggedIn" />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import Navigation from "@/components/Navigation.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    Navigation,
  },
  setup() {
    let auth;
    const isLoggedIn = ref(false);
    onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });
    return { isLoggedIn };
  },
};
</script>
<style>
/* CSS cho hiệu ứng chuyển tiếp */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>