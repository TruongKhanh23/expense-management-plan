<template>
  <div>
    <ConfigProvider :isDark="isDarkMode">
      <div class="flex flex-row">
        <a-table
          :columns="columns"
          :data-source="necessaryThingsTypeData"
          :pagination="{ hideOnSinglePage: true }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'name'">
              <p>{{ record.name }}</p>
            </template>
          </template>
        </a-table>
      </div>
    </ConfigProvider>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Table, Switch } from "ant-design-vue";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";
import type { NecessaryThingsType } from "@/types/types";

export default {
  components: {
    ATable: Table,
    ASwitch: Switch,
    ConfigProvider,
  },
  setup() {
    const store = useStore();
    const isEditable = ref(false);

    const isDarkMode = computed(() => store.getters.getIsDark);

    const necessaryThingsTypeData: NecessaryThingsType[] = computed(
      () => store.getters.getNecessaryThingsType,
    );

    const columns = [
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
      },
    ];

    return {
      isDarkMode,
      necessaryThingsTypeData,
      columns,
      isEditable,
    };
  },
};
</script>

<style>
/* Thêm style nếu cần */
</style>
