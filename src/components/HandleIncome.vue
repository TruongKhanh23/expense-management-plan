<template>
  <div class="md:px-4">
    <a-table :columns="columns" :data-source="data" @change="onChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'amount'">
          <a>{{ new Intl.NumberFormat().format(record.amount) }}</a>
        </template>
        <template v-if="column.dataIndex === 'type'">
          <div class="flex flex-col">
            <p class="text-center">{{ record.wallet }}</p>
            <a-tag :color="tagColor(record.type)" class="text-center">{{
              record.type
            }}</a-tag>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Table, Tag } from "ant-design-vue";
import type { TableColumnType, TableProps } from "ant-design-vue";

type TableDataType = {
  key: string;
  wallet: string;
  type: string;
  fund: string;
  amount: number;
};

export default {
  components: {
    ATag: Tag,
    ATable: Table,
  },
  props: {
    columnsHandleIncome: {
      type: Array as () => TableColumnType<TableDataType>[],
      default: () => [],
    },
    dataHandleIncome: {
      type: Array as () => TableDataType[],
      default: () => [],
    },
  },
  setup(props) {
    const tagTypeColor: Record<string, string> = {
      necessity: "pink",
      freedom: "blue",
      enjoy: "green",
      education: "purple",
      giving: "default",
      longTermSaving: "orange",
    };
    function tagColor(type: string) {
      if (type in tagTypeColor) {
        return tagTypeColor[type];
      }
    }
    const columns: TableColumnType<TableDataType>[] = props.columnsHandleIncome as TableColumnType<TableDataType>[];

    const data: TableDataType[] = props.dataHandleIncome;
    const onChange: TableProps<TableDataType>["onChange"] = (
      pagination,
      filters,
      sorter,
    ) => {
      console.log("params", pagination, filters, sorter);
    };
    return { tagColor, columns, data, onChange };
  },
};
</script>
<style scoped>
:deep(.ant-btn) {
  background-color: red !important;
}
</style>