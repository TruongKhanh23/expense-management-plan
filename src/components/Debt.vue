<template>
  <div class="flex items-center justify-between">
    <p class="my-2 font-bold">
      Tổng:
      {{ new Intl.NumberFormat().format(calculateTotal(data)) }}
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
        </template>
        <template v-if="column.dataIndex === 'amount'">
          <p>{{ record.amount }}</p>
        </template>
        <template v-if="column.dataIndex === 'isFinished'">
          <p>
            {{ record.isFinished }}
          </p>
        </template>
      </template>
    </a-table>
    <DebtEdit v-else :data="data" />
  </ConfigProvider>
</template>
<script lang="ts">
import { ref } from "vue";
import { Col, Table, Tag, Switch } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import { debts, columnsDebt } from "@/assets/data/sample";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";
import DebtEdit from "@/components/DebtEdit.vue";

type DebtItem = {
  id: string;
  name: string;
  amount: number;
  isFinished: boolean;
};

export default {
  components: {
    ATag: Tag,
    ATable: Table,
    ACol: Col,
    ConfigProvider,
    DebtEdit,
    ASwitch: Switch,
  },
  props: {
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
  },
  setup(props) {
    const isEditable = ref(false);
    const isDarkMode = props.isDark;

    const columns: TableColumnType<DebtItem>[] =
      columnsDebt as TableColumnType<DebtItem>[];

    const data: any = debts;
    console.log("data", data);

    function calculateTotal(values: any) {
      let total = 0;
      for (const item of values) {
        total += item.amount;
      }

      return total;
    }

    return { isDarkMode, data, columns, isEditable, calculateTotal };
  },
};
</script>
