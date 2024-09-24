<template>
  <div
    class="flex flex-col md:flex-row items-center justify-center gap-2 hover:font-bold cursor-pointer"
    @click="reload()"
  >
    <SyncOutlined  />
    <p class="text-xs md:text-normal">Sync Data</p>
  </div>
</template>
<script>
import { SyncOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    SyncOutlined,
  },
  setup() {
    function reload() {
      location.reload();
    }
    return { reload };
  },
};
</script>
