<template>
  <a-col :md="{ span: 6 }">
    <EstimateNecessity
      :data="dataEstimateNecessity"
      :necessityLimitation="necessityLimitation"
    />
  </a-col>

  <a-col :md="{ span: 8 }">
    <p>Current Count: {{ count }}</p>
    <a-button type="primary" @click="increment">Increment</a-button>
    <a-button type="primary" @click="decrement">Decrement</a-button>
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
import { computed } from "vue";
import { Col, Button } from "ant-design-vue";
import IncomeDebt from "@/components/IncomeDebt.vue";
import HandleIncome from "@/components/HandleIncome.vue";
import EstimateNecessity from "@/components/EstimateNecessity.vue";
import type { TableColumnType } from "ant-design-vue";
import { useStore } from "vuex";

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
  isRepay: string;
  debtId: number;
  isSolved: boolean;
};
type EstimateNecessityType = {
  id: string;
  details: EstimateNecessityItem[];
  name: string;
  order: number;
};
type EstimateNecessityItem = {
  id: string;
  name: string;
  amount: number;
};

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
  setup() {
    const store = useStore();
    const count = computed(() => store.getters.getCount);
    const debts = computed(() => store.getters.getDebts);
    const increment = () => {
      store.dispatch("increment");
    };
    const decrement = () => {
      store.dispatch("decrement");
    };

    return {
      count,
      increment,
      decrement,
    };
  },
};
</script>
