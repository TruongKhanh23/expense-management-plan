<template>
  <div id="app">
    <Navigation v-if="isLoggedIn && routeName !== 'SplashScreen'" />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from "vue-router";

import Navigation from "@/components/layoutElements/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  setup() {
    let auth;
    const store = useStore();
    const route = useRoute();
    const routeName = computed(() => {
      return route.name;
    });
    const isLoggedIn = ref(false);

    const isDarkMode = computed(() => store.getters.getIsDark);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    watch(isDarkMode, () => {
      if (metaThemeColor) {
        if (isDarkMode.value) {
          metaThemeColor.setAttribute("content", "#181A1B");
        } else {
          metaThemeColor.setAttribute("content", "#ffffff");
        }
      }
    });

    onMounted(() => {
      if (metaThemeColor) {
        if (isDarkMode.value) {
          metaThemeColor.setAttribute("content", "#181A1B");
        } else {
          metaThemeColor.setAttribute("content", "#ffffff");
        }
      }
      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });

    return { isLoggedIn, routeName };
  },
};
</script>
<style>
/* CSS cho hiệu ứng chuyển tiếp */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
