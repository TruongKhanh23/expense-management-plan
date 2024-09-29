<template>
  <nav class="bg-white border-gray-200 dark:bg-[#181A1B]">
    <div
      class="max-w-screen flex flex-wrap items-center justify-between mx-auto md:mx-32 p-4"
    >
      <a href="/home" class="flex items-center">
        <img
          src="/logo-transparent.png"
          class="h-12 mr-3"
          alt="Flowbite Logo"
        />
        <span
          class="hidden md:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >
          Expense Management Plan
        </span>
        <span
          class="md:hidden self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >
          EMP
        </span>
      </a>
      <div
        :class="{ hidden: !isMenuOpen }"
        class="w-full md:block md:w-auto"
        id="navbar-default"
      >
        <ul
          class="flex flex-col p-4 mt-4 text-center border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-[#181A1B] md:dark:bg-[#181A1B] dark:border-gray-700 font-medium"
        >
          <li v-for="item in menuItems" :key="item.text">
            <a
              v-if="item.condition"
              :href="item.href"
              @click="item.action"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              :class="{ 'cursor-pointer': item.action }"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
      <SignOut v-if="isLoggedIn" :isLoggedIn="isLoggedIn" :user="user" />
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "@/router";
import SignOut from "@/components/SignOut.vue"; // Import component

const isLoggedIn = ref(false);
const isMenuOpen = ref(false);

const user = ref({
  displayName: "",
  photoUrl: "",
});

onMounted(() => {
  const auth = getAuth();
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

const menuItems = ref([
  {
    text: "Login",
    href: "/login",
    condition: !isLoggedIn,
  },
  {
    text: "Register",
    href: "/register",
    condition: !isLoggedIn,
  },
]);
</script>

<style></style>
