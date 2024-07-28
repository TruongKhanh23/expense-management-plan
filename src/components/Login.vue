<template>
  <div
    class="flex justify-center items-start h-screen w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-[#181A1B] dark:border-gray-700"
  >
    <div
      class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-[#181A1B] dark:border-gray-700"
    >
      <form class="space-y-6" @submit.prevent="login">
        <h5
          class="text-xl font-medium text-gray-900 dark:text-white !text-center"
        >
          Sign in<br />
          Expense Management Plan
        </h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
            v-model="email"
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            v-model="password"
          />
        </div>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                v-model="rememberMe"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Remember me</label
            >
          </div>
          <a
            href="#"
            class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            @click.prevent="showResetPasswordModal = true"
            >Lost Password?</a
          >
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
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
            href="/register"
            class="text-blue-700 hover:underline dark:text-blue-500"
            >Create account</a
          >
        </div>
      </div>
    </div>

    <div
      v-if="showResetPasswordModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="dark:bg-[#181A1B] bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h3 class="text-xl font-medium mb-4">Reset Password</h3>
        <form @submit.prevent="resetPassword">
          <div class="mb-4">
            <label
              for="resetEmail"
              class="block text-sm font-medium text-gray-700 dark:text-white"
              >Enter your email address</label
            >
            <input
              type="email"
              id="resetEmail"
              class="mt-1 p-2 block w-full border border-gray-300 dark:bg-[#181A1B] rounded-md"
              v-model="resetEmail"
              required
            />
          </div>
          <p v-if="resetPasswordMessage" class="text-green-500">
            {{ resetPasswordMessage }}
          </p>
          <p v-if="resetPasswordError" class="text-red-500">
            {{ resetPasswordError }}
          </p>
          <div class="flex justify-end">
            <button
              type="button"
              @click="showResetPasswordModal = false"
              class="mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Send Reset Email
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { getPermissions } from "@/composables/permissions/index.js";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errorMessage = ref("");
const resetEmail = ref("");
const resetPasswordMessage = ref("");
const resetPasswordError = ref("");
const showResetPasswordModal = ref(false);
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
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value,
    );
    console.log("Successfully signed in!");
    console.log("auth currentUser", auth.currentUser);
    localStorage.setItem("users", JSON.stringify(auth.currentUser));

    if (rememberMe.value) {
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      localStorage.setItem("rememberMe", rememberMe.value);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }

    console.log("Redirecting to home page...");

    router.push("/");
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

const signInWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Successfully signed in with Google!");
      console.log(result.user);
      router.push("/");
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);
      alert(error.message);
    });
};

const resetPassword = async () => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, resetEmail.value);
    resetPasswordMessage.value = "Password reset email sent successfully!";
    resetPasswordError.value = "";
  } catch (error) {
    console.error("Error sending password reset email:", error);
    resetPasswordError.value =
      "Error sending password reset email. Please try again.";
    resetPasswordMessage.value = "";
  }
};
</script>

<style scoped></style>
