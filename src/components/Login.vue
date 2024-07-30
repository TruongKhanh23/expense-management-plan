<template>
  <div class="flex justify-center items-center min-h-screen bg-white">
    <div class="w-full max-w-sm bg-white dark:bg-[#181A1B] p-4 sm:p-6 md:p-8 md:border md:border-gray-200 dark:border-gray-700 rounded-lg sm:shadow">
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
