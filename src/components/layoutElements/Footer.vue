<template>
  <div
    class="flex flex-row gap-2 items-center justify-center md:static fixed bottom-0 left-0 right-0 md:bg-transparent md:shadow-none shadow-lg pt-4 pb-8 dark:bg-[#181A1B] bg-white"
  >
    <div class="flex-1 flex items-center justify-center">
      <ThemeSwitcher />
    </div>
    <div class="flex-1 flex items-center justify-center">
      <SyncData />
    </div>
    <div class="flex-1 flex items-center justify-center">
      <CreateNewMonth />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import ThemeSwitcher from "@/components/global/ThemeSwitcher.vue";
import SyncData from "@/components/layoutElements/SyncData.vue";
import CreateNewMonth from "@/components/month/CreateNewMonth.vue";

const store = useStore();
const isDarkMode = computed(() => store.getters.getIsDark);
</script>

<style scoped>
@media (max-width: 768px) {
  .fixed {
    z-index: 1000; /* Đảm bảo footer nằm trên các nội dung khác khi ở mobile */
  }
}
</style>
