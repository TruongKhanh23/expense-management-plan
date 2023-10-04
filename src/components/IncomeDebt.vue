<template>
  <div class="px-4 my-4 md:my-0">
    <div class="min-h-[300px]">
      <InputIncome @action:updateDataIncome="handleUpdateDataIncome" />
      <p class="my-2 font-bold text-center">
        Tổng thu nhập: {{ new Intl.NumberFormat().format(totalIncome) }}
      </p>
      <a-table :columns="columns" :data-source="dataIncome">
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
import { ref, computed } from "vue"
import { Table } from "ant-design-vue";
import InputIncome from "@/components/InputIncome.vue"
import { calculateTotalIncome } from "@/utils/number.util"
export default {
  components: {
    ATable: Table,
    InputIncome,
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
  },
  setup(){
    const dataIncomeStorage = ref(0)
    const dataIncome = computed(() => dataIncomeStorage.value)
    const totalIncome = computed(() => calculateTotalIncome(dataIncomeStorage.value))

    function handleUpdateDataIncome(values) {
      dataIncomeStorage.value = values
      console.log("dataIncomeStorage", dataIncomeStorage);
    }
    return { dataIncomeStorage, dataIncome, handleUpdateDataIncome, totalIncome }
  }
};
</script>
