<template>
  <div
    class="flex flex-col md:flex-row items-center justify-center gap-2 text-whiterounded cursor-pointer hover:font-bold"
    @click="toggleDark()"
  >
    <AppstoreOutlined />
    <p class="text-xs md:text-normal">Dark Mode</p>
  </div>
</template>

<script>
import feather from "feather-icons";
import { computed, defineProps, defineEmits, onMounted, watch } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useStore } from "vuex";
import { AppstoreOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    AppstoreOutlined
  },
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
