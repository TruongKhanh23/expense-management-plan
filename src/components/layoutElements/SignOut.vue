<template>
  <div v-if="isLoggedIn" class="relative" @click="togglePopup">
    <div class="flex items-center cursor-pointer">
      <span class="text-gray-900 dark:text-white">{{ user.displayName }}</span>
      <img
        :src="user.photoUrl"
        alt="User Photo"
        class="w-10 h-10 rounded-full ml-2"
      />
    </div>
    <div
      v-if="isPopupVisible"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-[#181a1b] border rounded shadow-lg py-1 z-10"
    >
      <button
        @click="handleSignOut"
        class="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 dark:hover:bg-[#181a1b]"
      >
        Sign out
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import router from "@/router";

const isLoggedIn = ref(false);
const user = ref({
  displayName: "",
  photoUrl: "",
});
const isPopupVisible = ref(false);
const auth = getAuth();

onMounted(() => {
  onAuthStateChanged(auth, (userData) => {
    isLoggedIn.value = !!userData;
    if (userData) {
      user.value = {
        displayName: userData.displayName || userData.email || "",
        photoUrl: userData.photoURL || "/default-avatar.webp",
      };
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    document.documentElement.classList.remove("dark");

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#ffffff");
    }

    router.push("/login");
  });
};

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value;
};
</script>

<style scoped>
/* Style cho component nếu cần */
</style>
