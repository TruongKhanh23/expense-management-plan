<template>
  <component :is="icon" :width="width" :height="height" />
</template>

<script>
import { defineAsyncComponent } from "vue";
const lazyLoad = (iconName) =>
  defineAsyncComponent(() => import(`./icons/${iconName}.vue`));
export default {
  name: "CIcon",
  components: {
    Cross: lazyLoad("Cross"),
  },
  props: {
    icon: {
      type: String,
      required: true,
      default: "Default",
    },
    width: {
      type: String,
      default: "24",
    },
    height: {
      type: String,
      default: "24",
    },
  },
};
</script>
