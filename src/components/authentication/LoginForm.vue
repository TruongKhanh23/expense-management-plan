<template>
  <form class="space-y-6" @submit.prevent="login">
    <div class="flex flex-col items-center justify-center">
      <img src="/logo-transparent.png" alt="logo" class="h-16" />
      <h5 class="text-xl font-medium text-gray-900 dark:text-white !text-center">
        Sign in <br />
        Expense Management Plan
      </h5>
    </div>
    <EmailInput v-model="email" />
    <PasswordInput v-model="password" />
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    <div class="flex items-start">
      <RememberMeCheckbox v-model="rememberMe" />
      <ForgotPasswordLink @click="$emit('action:openResetPasswordModal', true)" />
    </div>
    <button
      type="submit"
      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Login
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { getPermissions, grantPermission } from "@/composables/permissions/index.js";
import EmailInput from '@/components/authentication/EmailInput.vue';
import PasswordInput from '@/components/authentication/PasswordInput.vue';
import RememberMeCheckbox from '@/components/authentication/RememberMeCheckbox.vue';
import ForgotPasswordLink from '@/components/authentication/ForgotPasswordLink.vue';

const emit = defineEmits(["action:openResetPasswordModal"])

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref('');
const router = useRouter();

onMounted(async () => {
  const savedEmail = localStorage.getItem("email");
  const savedPassword = localStorage.getItem("password");
  const savedRememberMe = localStorage.getItem("rememberMe") === "true";

  if (savedRememberMe && savedEmail && savedPassword) {
    email.value = savedEmail;
    password.value = savedPassword;
    rememberMe.value = savedRememberMe;
  }

  const permissions = await getPermissions();
  console.log("Permissions:", permissions);
});

const login = async () => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    localStorage.setItem("user", JSON.stringify(auth.currentUser));
    if (auth.currentUser.email === "truongnguyenkhanh230800@gmail.com") {
      auth.currentUser.email = "admin";
      localStorage.setItem("user", JSON.stringify(auth.currentUser));
    }

    if (rememberMe.value) {
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      localStorage.setItem("rememberMe", rememberMe.value);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }

    grantPermission();

    console.log("Redirecting to home page...");

    router.push("/home");
  } catch (error) {
    console.log("error code", error.code);
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage.value = "Invalid Email";
        break;
      case "auth/user-not-found":
        errorMessage.value = "No account with that email was found";
        break;
      case "auth/wrong-password":
        errorMessage.value = "Incorrect password";
        break;
      default:
        errorMessage.value = "Email or password was incorrect";
        break;
    }
  }
};
</script>
