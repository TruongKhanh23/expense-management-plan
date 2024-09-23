<template>
  <CreateNewMonthModal :isOpen="isOpenCreateNewMonthModal" />
  <div
    class="flex items-center justify-center gap-2 hover:font-bold cursor-pointer"
  >
    <PlusOutlined />
    <button @click="handleCreateNewMonth" class="hidden md:flex">Create new month</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { open, close } from "@/composables/loadingModal/index.js";
import CreateNewMonthModal from "@/components/month/CreateNewMonthModal.vue";
import { PlusOutlined } from "@ant-design/icons-vue";

const store = useStore();

const isOpenCreateNewMonthModal = computed(
  () => store.getters.getIsOpenCreateNewMonthModal,
);
async function handleCreateNewMonth() {
  const newValue = open();
  store.dispatch("setIsOpenCreateNewMonthModal", true);
}
</script>
