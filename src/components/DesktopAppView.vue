<template>
  <a-col :md="{ span: 6 }">
    <EstimateNecessity
      :data="dataEstimateNecessity"
      :necessityLimitation="necessityLimitation"
    />
  </a-col>

  <a-col :md="{ span: 8 }">
    <p>Hello</p>
    <IncomeDebt
      :columns="columnsIncome"
      :data="dataIncome"
      :totalIncome="totalIncome"
      :isDark="isDark"
      @action:updateDataTotalIncome="
        $emit('action:updateDataTotalIncome', $event)
      "
    />
  </a-col>

  <a-col :md="{ span: 10 }">
    <HandleIncome
      :isDark="isDark"
      :columnsHandleIncome="columnsHandleIncome"
      :dataHandleIncome="dataHandleIncome"
      :funds="funds"
      :totalIncome="totalIncome"
    />
  </a-col>
</template>
<script lang="ts">
import { Col, Button } from "ant-design-vue";
import IncomeDebt from "@/components/IncomeDebt.vue";
import HandleIncome from "@/components/HandleIncome.vue";
import EstimateNecessity from "@/components/EstimateNecessity.vue";
import type { TableColumnType } from "ant-design-vue";
import type {
  EstimateNecessityType,
  HandleIncomeType,
  HandleIncomeItem,
} from "@/types/types";

export default {
  components: {
    ACol: Col,
    AButton: Button,
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
    dataEstimateNecessity: {
      type: Array as () => EstimateNecessityType[],
      default: () => [],
    },
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
    funds: {
      type: Object,
      require: true,
    },
  },
  emits: ["action:updateDataTotalIncome"],
};
</script>
