<template>
  <div class="px-4 my-4 md:my-0">
    <div class="min-h-[300px]">
      <div class="flex items-center justify-between">
        <p class="my-2 font-bold text-center">
          Tổng thu nhập: {{ new Intl.NumberFormat().format(totalIncome) }}
        </p>
        <div class="flex flex-row">
          <p class="font-bold mr-2 hidden md:flex">Chế độ chỉnh sửa:</p>
          <a-switch class="my-ant-switch" v-model:checked="isEditable" />
        </div>
      </div>
      <a-table v-if="!isEditable" :columns="columns" :data-source="dataIncome">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
          <template v-if="column.dataIndex === 'amount'">
            <a>{{ new Intl.NumberFormat().format(text) }}</a>
          </template>
        </template>
      </a-table>
      <InputIncome v-else
        @action:updateDataIncome="handleUpdateDataIncome"
        :incomes="dataIncome"
      />
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { Table, Switch } from "ant-design-vue";
import InputIncome from "@/components/InputIncome.vue";

export default {
  components: {
    ATable: Table,
    InputIncome,
    ASwitch: Switch,
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
      type: Number,
      require: true,
    },
  },
  emits: ["action:updateDataTotalIncome"],
  setup(props, { emit }) {
    const isEditable = ref(false);
    const dataIncomeStorage = ref(null);
    const dataIncome = computed(() => {
      emit("action:updateDataTotalIncome", props.data);
      return props.data;
    });

    function handleUpdateDataIncome(values) {
      dataIncomeStorage.value = values;
      emit("action:updateDataTotalIncome", dataIncomeStorage.value);
    }
    return {
      isEditable,
      dataIncomeStorage,
      dataIncome,
      handleUpdateDataIncome,
    };
  },
};
</script>
