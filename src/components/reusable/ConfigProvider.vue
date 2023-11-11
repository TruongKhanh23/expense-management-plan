<template>
  <ConfigProvider :theme="valueTheme">
    <slot />
  </ConfigProvider>
</template>
<script>
import { computed } from "vue";
import { ConfigProvider, theme } from "ant-design-vue";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  components: { ConfigProvider },
  props: {
    isDark: {
      type: Boolean,
      require: true,
    },
  },
  setup(props) {
    const valueTheme = computed(() => {
      return {
        algorithm: props.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          fontFamily: ["Manrope Variable", ...fontFamily.sans].join(","),
        },
      };
    });
    return { theme, fontFamily, valueTheme };
  },
};
</script>
