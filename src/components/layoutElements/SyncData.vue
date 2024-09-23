<template>
  <div
    class="flex items-center justify-center gap-2 hover:font-bold cursor-pointer"
    @click="reload()"
  >
    <SyncOutlined />
    <p class="hidden md:flex">Đồng bộ dữ liệu</p>
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
