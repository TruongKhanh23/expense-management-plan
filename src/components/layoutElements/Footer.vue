<template>
  <div
    :class="[
      'transition-transform duration-300 ease-in-out',
      isHidden ? 'hidden md:flex' : '',
      isMobile ? 'fixed bottom-0 left-0 right-0 z-50' : 'relative',
    ]"
    class="flex flex-row gap-2 items-center justify-center bg-white dark:bg-[#181A1B] p-4"
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
    <div class="flex-1 flex items-center justify-center">
      <ChatIcon />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useStore } from "vuex";
import ThemeSwitcher from "@/components/global/ThemeSwitcher.vue";
import SyncData from "@/components/layoutElements/SyncData.vue";
import CreateNewMonth from "@/components/month/CreateNewMonth.vue";
import ChatIcon from "@/components/ChatIcon.vue";

const store = useStore();
const isHidden = ref(false);
let lastScrollTop = 0;

// Kiểm tra kích thước màn hình để xác định mobile hay không
const isMobile = computed(() => window.innerWidth < 768);

const handleScroll = () => {
  const currentScrollTop = window.scrollY;

  if (currentScrollTop > lastScrollTop) {
    isHidden.value = true; // Scroll down
  } else {
    isHidden.value = false; // Scroll up
  }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Đảm bảo không có giá trị âm
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", () => {
    // Cập nhật khi kích thước cửa sổ thay đổi
    isHidden.value = window.innerWidth < 768 ? isHidden.value : false;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
