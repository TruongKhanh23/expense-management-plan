<template>
  <div
    class="w-full max-w-md sm:mr-[6rem] bg-white dark:bg-[#181A1B] p-6 md:border md:border-gray-200 dark:border-gray-700 rounded-3xl sm:shadow"
  >
    <LoginForm @action:openResetPasswordModal="handleOpenResetPasswordModal" />
    <SignInWithGoogle />
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered?
      <a
        @click="$emit('action:updateLoginType', 'register')"
        class="text-blue-700 hover:underline dark:text-blue-500"
        >Create account</a
      >
    </div>
  </div>
  <ResetPasswordModal
    :isShow="showResetPasswordModal"
    @action:closeModal="handleCloseResetPasswordModal"
  />
</template>

<script setup>
import { ref, defineEmits } from "vue";
import LoginForm from "@/components/login/LoginForm.vue";
import SignInWithGoogle from "@/components/login/SignInWithGoogle.vue";
import ResetPasswordModal from "@/components/login/ResetPasswordModal.vue";

const emit = defineEmits(["action:updateLoginType"])

const showResetPasswordModal = ref(false);

const handleCloseResetPasswordModal = () => {
  showResetPasswordModal.value = false;
};
const handleOpenResetPasswordModal = () => {
  showResetPasswordModal.value = true;
};
</script>
