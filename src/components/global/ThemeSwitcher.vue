<template>
  <div
    class="flex flex-row items-center justify-center gap-2 text-whiterounded cursor-pointer hover:font-bold"
    @click="toggleDark()"
  >
    <i data-feather="moon" class="w-5"></i>
    <p class="hidden md:flex">Toggle Dark Mode</p>
  </div>
</template>

<script>
import feather from "feather-icons";
import { computed, defineProps, defineEmits, onMounted, watch } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useStore } from "vuex";

export default {
  setup(props, { emit }) {
    const store = useStore();

    const isDark = useDark({
      onChanged(isDark) {
        if (isDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    });
    const toggleDark = useToggle(isDark);

    watch(isDark, () => {
      store.dispatch("setIsDark", isDark);
    });

    onMounted(() => {
      feather.replace();
    });

    return { toggleDark, isDark };
  },
};
</script>
