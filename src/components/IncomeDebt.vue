<template>
  <div class="px-4 my-4 md:my-0">
    <div class="min-h-[300px]">
      <p class="my-2 font-bold text-center">
        Tổng thu nhập: {{ new Intl.NumberFormat().format(totalIncome) }}
      </p>
      <a-table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
          <template v-if="column.dataIndex === 'amount'">
            <a>{{ new Intl.NumberFormat().format(text) }}</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { Table } from "ant-design-vue";
export default {
  components: {
    ATable: Table,
  },
  props: {
    columns: {
      type: Object,
      require: true,
    },
    data: {
      type: Object,
      require: true,
    },
    totalIncome: {
      type: String,
      require: true,
    },
  },
};
</script>
