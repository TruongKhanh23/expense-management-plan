<template>
  <div class="flex items-center justify-between">
    <p class="my-2 font-bold">
      Tổng số vật dụng:
    </p>
    <div class="flex flex-row my-2">
      <p class="font-bold mr-2 hidden md:flex">Chỉnh sửa:</p>
      <a-switch class="my-ant-switch" v-model:checked="isEditable" />
    </div>
  </div>
  <ConfigProvider :isDark="isDarkMode">
    <a-table
      v-if="!isEditable"
      :columns="columns"
      :data-source="data"
      :pagination="{ hideOnSinglePage: true }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <p>{{ record.name }}</p>
          <a-tag :color="tagColor(record.type)" class="text-center">{{
            record.type
          }}</a-tag>
        </template>
        <template v-if="column.dataIndex === 'timespan'">
          <p>{{ roundDecimals(record.timespan, 2) }}</p>
        </template>
        <template v-if="column.dataIndex === 'savePerMonth'">
          <p>
            {{
              new Intl.NumberFormat().format(
                roundDecimals(record.savePerMonth, 0),
              )
            }}
          </p>
        </template>
        <template v-if="column.dataIndex === 'limitation'">
          <p>
            {{ new Intl.NumberFormat().format(record.limitation) }}
          </p>
        </template>
      </template>
    </a-table>
    <NecessaryThingsEdit v-else />
  </ConfigProvider>
</template>
<script lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Col, Table, Tag, Switch } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import type { NecessaryThingsItem } from "@/types/types";
import {
  columnsNecessaryThings,
  dataNecessaryThings,
} from "@/assets/data/sample";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";
import NecessaryThingsEdit from "@/components/necessity/NecessaryThingsEdit.vue";

export default {
  components: {
    ATag: Tag,
    ATable: Table,
    ACol: Col,
    ASwitch: Switch,
    ConfigProvider,
    NecessaryThingsEdit,
  },
  setup() {
    const store = useStore();

    const isEditable = ref(false);
    const isDarkMode = computed(() => store.getters.getIsDark);
    const tagTypeColor: Record<string, string> = {
      shampoo: "pink",
      skinCare: "blue",
      oralHealth: "green",
      bodyCare: "purple",
      furniture: "default",
    };
    function tagColor(type: string) {
      if (type in tagTypeColor) {
        return tagTypeColor[type];
      }
    }

    const columns: TableColumnType<NecessaryThingsItem>[] =
      columnsNecessaryThings as TableColumnType<NecessaryThingsItem>[];

    const data: any = computed(() => store.getters.getNecessaryThings);

    function roundDecimals(value: number, decimals: number): number {
      if (isNaN(value)) return 0;
      return parseFloat(value.toFixed(decimals));
    }

    return { isEditable, isDarkMode, data, columns, roundDecimals, tagColor };
  },
};
</script>
