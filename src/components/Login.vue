<template>
  <div class="flex justify-center items-center min-h-screen bg-white">
    <div
      class="sm:flex sm:flex-col sm:items-center sm:justify-start w-full mr-[2rem] hidden text-center text-[#008037]"
    >
      <h1 class="text-3xl font-semibold mb-6">Expense Management Plan</h1>
      <img src="/loginImageCloud.png" class="w-[60%] h-[60%]" alt="login" />
      <div class="font-bold">
        <p>Quy tắc 6 chiếc lọ</p>
        <p>The 6 JARS Money Management System</p>
      </div>
      <p class="w-[55%]">
        Là phương pháp quản lý chi tiêu được đề xuất bởi tác giả T. Harv Eker
        trong cuốn sách “Secrets of the Millionaire Mind”. Phương pháp chia thu
        nhập thành 6 phần: nhu cầu thiết yếu (55%), tiết kiệm dài hạn (10%), tự
        do tài chính (10%), giáo dục (10%), hưởng thụ (10%), từ thiện (5%). Rất
        nhiều người trên thế giới đang ứng dụng và đạt được hiệu quả trong việc
        quản lý tiền bạc, lập kế hoạch chi tiêu và sử dụng dòng tiền hợp lý.
      </p>
    </div>
    <div
      class="w-full max-w-md sm:mr-[6rem] bg-white dark:bg-[#181A1B] p-6 md:border md:border-gray-200 dark:border-gray-700 rounded-3xl sm:shadow"
    >
      <LoginForm
        @action:openResetPasswordModal="handleOpenResetPasswordModal"
      />
      <SignInWithGoogle />
    </div>
    <ResetPasswordModal
      :isShow="showResetPasswordModal"
      @action:closeModal="handleCloseResetPasswordModal"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginForm from "@/components/Login/LoginForm.vue";
import SignInWithGoogle from "@/components/Login/SignInWithGoogle.vue";
import ResetPasswordModal from "@/components/Login/ResetPasswordModal.vue";

const showResetPasswordModal = ref(false);

const handleCloseResetPasswordModal = () => {
  showResetPasswordModal.value = false;
};
const handleOpenResetPasswordModal = () => {
  showResetPasswordModal.value = true;
};
</script>
