<template>
  <div id="app">
    <Navigation v-if="isLoggedIn" />
    <router-view />
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
