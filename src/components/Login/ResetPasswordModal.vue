<template>
  <div
    v-if="isShow"
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
            @click="$emit('action:closeModal', false)"
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
</template>

<script setup>
import { ref, defineProps } from "vue";
import {
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";

defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["action:closeModal"])

const resetEmail = ref("");
const resetPasswordMessage = ref("");
const resetPasswordError = ref("");

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
