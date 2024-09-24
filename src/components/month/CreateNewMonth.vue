<template>
  <CreateNewMonthModal :isOpen="isOpenCreateNewMonthModal" />
  <div
    class="flex flex-col md:flex-row items-center justify-center gap-2 hover:font-bold hover:scale-125 cursor-pointer"
    @click="handleCreateNewMonth" 
  >
    <PlusOutlined />
    <button class="text-xs md:text-normal">New month</button>
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
