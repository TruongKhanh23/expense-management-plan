<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-opacity-100 bg-[#000000]"
  >
    <div
      class="h-24 w-[500px] mx-4 md:mx-0 flex flex-col items-center justify-center rounded-lg bg-[#ffffff] dark:bg-[#181A1B]"
    >
      <div class="text-xl"><LoadingOutlined /></div>
      <p class="text-lg font-bold mt-2">Đang tải...</p>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
</script>
