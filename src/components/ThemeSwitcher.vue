<template>
  <div
    class="flex flex-row items-center justify-center gap-2 text-whiterounded cursor-pointer hover:font-bold"
    @click="toggleDark()"
  >
    <i data-feather="moon" class="w-5"></i>
    <p>Toggle Dark Mode</p>
  </div>
</template>

<script>
import feather from "feather-icons";
import { computed, defineProps, defineEmits, onMounted } from "vue";

export default {
  props: {
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
  },
  emits: ["action:toggleDark"],
  setup(props, { emit }) {
    onMounted(() => {
      feather.replace();
    });
    function toggleDark() {
      emit("action:toggleDark");
    }
    return { toggleDark };
  },
};
</script>
