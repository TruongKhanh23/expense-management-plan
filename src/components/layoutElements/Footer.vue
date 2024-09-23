<template>
  <div
    class="flex flex-col md:flex-row my-12 gap-4 items-center justify-center"
  >
    <div class="flex items-center justify-center">
      <ThemeSwitcher />
    </div>
    <SyncData />
    <CreateNewMonth />
  </div>
</template>
<script>
import ThemeSwitcher from "@/components/global/ThemeSwitcher.vue";
import SyncData from "@/components/layoutElements/SyncData.vue";
import CreateNewMonth from "@/components/month/CreateNewMonth.vue";

export default {
  components: {
    ThemeSwitcher,
    SyncData,
    CreateNewMonth,
  },
  setup() {
    return { };
  },
};
</script>
