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
  name: string;
  age: number;
  address: string;
};

export default {
  components: {
    ATag: Tag,
    ATable: Table,
  },
  props: {
    columnsHandleIncome: {
      type: Object,
      default: () => {},
    },
    dataHandleIncome: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const tagTypeColor = {
      necessity: "pink",
      freedom: "blue",
      enjoy: "green",
      education: "purple",
      giving: "default",
      longTermSaving: "orange",
    };
    function tagColor(type) {
      console.log("went tag", type);
      if (Object.prototype.hasOwnProperty.call(tagTypeColor, type)) {
        console.log("tagTypeColor[type]", tagTypeColor[type]);
        return tagTypeColor[type];
      }
    }
    const columns: TableColumnType<TableDataType>[] = props.columnsHandleIncome;

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
