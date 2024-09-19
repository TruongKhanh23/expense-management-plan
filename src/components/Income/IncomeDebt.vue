<template>
  <div class="px-4">
    <div class="min-h-[300px]">
      <div class="flex items-center justify-between">
        <p class="my-2 font-bold">
          Tổng thu nhập: {{ new Intl.NumberFormat().format(totalIncome) }}
        </p>
        <div class="flex flex-row">
          <p class="font-bold mr-2 hidden md:flex">Chỉnh sửa:</p>
          <a-switch class="my-ant-switch" v-model:checked="isEditable" />
        </div>
      </div>
      <ConfigProvider :isDark="isDarkMode">
        <a-table
          v-if="!isEditable"
          :columns="columns"
          :data-source="dataIncome"
          :pagination="{ hideOnSinglePage: true }"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
              <a>{{ text }}</a>
            </template>
            <template v-if="column.dataIndex === 'amount'">
              <a>{{ new Intl.NumberFormat().format(text) }}</a>
            </template>
          </template>
        </a-table>
        <InputIncome v-else :incomes="dataIncome" />
      </ConfigProvider>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { Table, Switch } from "ant-design-vue";
import InputIncome from "@/components/Income/InputIncome.vue";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";
import { columnsIncome as columns } from "@/assets/data/sample";

export default {
  components: {
    ATable: Table,
    InputIncome,
    ASwitch: Switch,
    ConfigProvider,
  },
  props: {
    totalIncome: {
      type: Number,
      require: true,
    },
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const isDarkMode = props.isDark;
    const isEditable = ref(false);
    const dataIncomeStorage = ref(null);
    const dataIncome = computed(() => {
      const incomes = store.getters.getIncomes;
      return incomes;
    });

    return {
      isEditable,
      dataIncomeStorage,
      dataIncome,
      isDarkMode,
      columns,
    };
  },
};
</script>
