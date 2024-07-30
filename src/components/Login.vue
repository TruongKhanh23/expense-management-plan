<template>
  <div class="flex justify-center items-center min-h-screen w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-[#181A1B] dark:border-gray-700">
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-[#181A1B] dark:border-gray-700">
      <LoginForm @action:openResetPasswordModal="handleOpenResetPasswordModal" />
      <SignInWithGoogle />
    </div>
    <ResetPasswordModal :isShow="showResetPasswordModal" @action:closeModal="handleCloseResetPasswordModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginForm from '@/components/Login/LoginForm.vue';
import SignInWithGoogle from '@/components/Login/SignInWithGoogle.vue';
import ResetPasswordModal from '@/components/Login/ResetPasswordModal.vue';

const showResetPasswordModal = ref(false);

const handleCloseResetPasswordModal = () => {
  showResetPasswordModal.value = false;
};
const handleOpenResetPasswordModal = () => {
  showResetPasswordModal.value = true;
}
</script>
