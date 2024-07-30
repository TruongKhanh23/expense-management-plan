<template>
  <div v-if="loaded" class="flex items-center justify-center h-[100vh] bg-white sm:hidden">
    <!-- Nội dung màn giới thiệu -->
    <div class="flex flex-col items-center justify-start w-full text-center text-[#008037]">
      <img src="/logo-transparent.png" alt="logo" class="h-32" />
      <h1 class="text-2xl font-semibold">Expense Management Plan</h1>
      <p class="text-6xl font-bold mb-6 mt-4">6 JARS</p>
      <img src="/homePageNew.png" class="w-[80%] h-[80%]" alt="login" />
      <div class="font-bold">
        <p>Quy tắc 6 chiếc lọ</p>
        <p>The 6 JARS Money Management System</p>
      </div>
      <img src="/author-removebg-preview-new.png" class="w-[80%] h-[80%]" alt="login" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import detectDevice from "@/utils/device.util";

const router = useRouter();
const { isMobile } = detectDevice();
const loaded = ref(false);

const preloadImages = (imageArray) => {
  return Promise.all(imageArray.map(src => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
    });
  }));
};

onMounted(() => {
  if (isMobile) {
    const images = [
      "/logo-transparent.png",
      "/homePageNew.png",
      "/author-removebg-preview-new.png"
    ];
    
    preloadImages(images).then(() => {
      loaded.value = true;
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    });
  } else {
    router.push("/login");
  }
});
</script>
