<template>
  <CreateNewMonthModal :isOpen="isOpenCreateNewMonthModal" />
  <button @click="handleCreateNewMonth">Create new month</button>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { open, close } from "@/composables/loadingModal/index.js";
import CreateNewMonthModal from "@/components/Month/CreateNewMonthModal.vue";

const store = useStore();

const isOpenCreateNewMonthModal = computed(
  () => store.getters.getIsOpenCreateNewMonthModal,
);
async function handleCreateNewMonth() {
  const newValue = open();
  store.dispatch("setIsOpenCreateNewMonthModal", true);
}
</script>
