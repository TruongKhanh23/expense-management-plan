<template>
  <ConfigProvider :isDark="isDarkMode">
    <a-table
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
  </ConfigProvider>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Col, Table, Tag } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import type { NecessaryThingsItem } from "@/types/types";
import {
  columnsNecessaryThings,
  dataNecessaryThings,
} from "@/assets/data/sample";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";

export default {
  components: {
    ATag: Tag,
    ATable: Table,
    ACol: Col,
    ConfigProvider,
  },
  setup() {
    const store = useStore();
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

    const data: any = dataNecessaryThings;

    function roundDecimals(value: number, decimals: number): number {
      if (isNaN(value)) return 0;
      return parseFloat(value.toFixed(decimals));
    }

    return { isDarkMode, data, columns, roundDecimals, tagColor };
  },
};
</script>
