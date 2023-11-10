<template>
  <a-tabs centered>
    <a-tab-pane key="1" tab="Dự chi thiết yếu">
      <EstimateNecessity :necessityLimitation="necessityLimitation" />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Thu nhập" force-render>
      <IncomeDebt
        class="md:border-l md:border-r px-4"
        :columns="columnsIncome"
        :data="dataIncome"
        :totalIncome="totalIncome"
        @action:updateDataTotalIncome="$emit('action:updateDataTotalIncome', $event)"
      />
    </a-tab-pane>
    <a-tab-pane key="3" tab="Xử lý thu nhập">
      <HandleIncome
        :columnsHandleIncome="columnsHandleIncome"
        :dataHandleIncome="dataHandleIncome"
      />
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts">
import { Tabs, TabPane } from "ant-design-vue";
import IncomeDebt from "@/components/IncomeDebt.vue";
import HandleIncome from "@/components/HandleIncome.vue";
import EstimateNecessity from "@/components/EstimateNecessity.vue";
import type { TableColumnType } from "ant-design-vue";

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
    ATabs: Tabs,
    ATabPane: TabPane,
    IncomeDebt,
    HandleIncome,
    EstimateNecessity,
  },
  props: {
    necessityLimitation: {
      type: Number,
      require: true,
    },
    columnsIncome: {
      type: Object,
      require: true,
    },
    dataIncome: {
      type: Object,
      require: true,
    },
    totalIncome: {
      type: Number,
      require: true,
    },
    columnsHandleIncome: {
      type: Array as () => TableColumnType<HandleIncomeItem>[],
      default: () => [],
    },
    dataHandleIncome: {
      type: Array as () => HandleIncomeType[],
      default: () => [],
    },
  },
  emits: ["action:updateDataTotalIncome"],
};
</script>
