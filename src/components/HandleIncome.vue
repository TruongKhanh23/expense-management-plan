<template>
  <div class="md:px-4 my-4 md:my-0">
    <div class="flex items-center justify-between">
      <p class="my-2 font-bold">Danh sách xử lý thu nhập</p>
      <div class="flex flex-row my-2">
        <p class="font-bold mr-2 hidden md:flex">Chỉnh sửa:</p>
        <a-switch class="my-ant-switch" v-model:checked="isEditable" />
      </div>
    </div>
    <template v-for="(typeData, index) in data">
      <div class="my-4">
        <div class="text-center font-bold mb-4">
          Tổng:
          {{ new Intl.NumberFormat().format(calculateTotal(typeData.items)) }}
        </div>
        <a-table
          v-if="!isEditable"
          :columns="columns"
          :data-source="typeData.items"
          :key="index"
          @change="onChange"
          :pagination="{ hideOnSinglePage: true }"
        >
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
        <HandleIncomeEdit v-else :data="typeData.items" />
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { ref, computed } from "vue";
import { Table, Tag, Switch } from "ant-design-vue";
import type { TableColumnType, TableProps } from "ant-design-vue";
import HandleIncomeEdit from "@/components/HandleIncomeEdit.vue";

type HandleIncomeType = {
  id: string;
  type: string;
  items: HandleIncomeItem[];
};
type HandleIncomeItem = {
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
    ASwitch: Switch,
    HandleIncomeEdit,
  },
  props: {
    columnsHandleIncome: {
      type: Array as () => TableColumnType<HandleIncomeItem>[],
      default: () => [],
    },
    dataHandleIncome: {
      type: Array as () => HandleIncomeType[],
      default: () => [],
    },
  },
  setup(props) {
    const isEditable = ref(false);
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
    const columns: TableColumnType<HandleIncomeItem>[] =
      props.columnsHandleIncome as TableColumnType<HandleIncomeItem>[];

    const data: any = computed(() => props.dataHandleIncome);
    const onChange: TableProps<HandleIncomeItem>["onChange"] = (
      pagination,
      filters,
      sorter,
    ) => {
      console.log("params", pagination, filters, sorter);
    };

    function calculateTotal(values: any) {
      let total = 0;
      for (const item of values) {
        total += item.amount;
      }
      console.log("total", total);

      return total;
    }
    return { tagColor, columns, data, onChange, isEditable, calculateTotal };
  },
};
</script>
<style scoped></style>
