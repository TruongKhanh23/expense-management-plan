<template>
  <div class="mt-4 space-y-2">
    <p class="text-center">hoặc đăng nhập nhanh bằng</p>
    <button
      type="button"
      class="w-full border-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-[#1D1D1D] dark:hover:bg-[#3b3b3b] dark:focus:bg-[#3b3b3b]"
      @click="signInWithGoogle"
    >
      <div class="flex flex-row items-center justify-center">
        <img src="/google.svg" alt="Google logo" class="mr-2" /> Google
      </div>
    </button>
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered?
      <a
        @click="router.push('/register')"
        class="text-blue-700 hover:underline dark:text-blue-500"
        >Create account</a
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { grantPermission } from "@/composables/permissions/index.js";

const router = useRouter();
const signInWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      if (result.user.email === "truongnguyenkhanh230800@gmail.com") {
        result.user.email = "admin";
        localStorage.setItem("user", JSON.stringify(result.user));
      }
      localStorage.setItem("user", JSON.stringify(result.user));
      grantPermission();
      router.push("/");
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);
      alert(error.message);
    });
};
</script>