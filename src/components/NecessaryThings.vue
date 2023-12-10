<template>
  <a-col :md="{ span: 6 }">
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
  </a-col>
  <a-col :md="{ span: 8 }"></a-col>
  <a-col :md="{ span: 10 }"></a-col>
</template>
<script lang="ts">
import { Col, Table, Tag } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import {
  columnsNecessaryThings,
  dataNecessaryThings,
} from "@/assets/data/sample";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";

type NecessaryThingsItem = {
  id: number;
  name: string;
  timespan: number;
  savePerMonth: number;
  limitation: number;
  type: string;
};

export default {
  components: {
    ATag: Tag,
    ATable: Table,
    ACol: Col,
    ConfigProvider,
  },
  props: {
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
  },
  setup(props) {
    const isDarkMode = props.isDark;
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
