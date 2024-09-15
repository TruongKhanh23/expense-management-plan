<template>
  <a-tabs centered class="dark:text-[#ffffff]">
    <a-tab-pane key="1" tab="Dự chi thiết yếu">
      <EstimateNecessity
        :data="dataEstimateNecessity"
        :necessityLimitation="necessityLimitation"
      />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Thu nhập" force-render>
      <IncomeDebt
        class="md:border-l md:border-r px-4"
        :columns="columnsIncome"
        :totalIncome="totalIncome"
        :isDark="isDark"
      />
    </a-tab-pane>
    <a-tab-pane key="3" tab="Xử lý thu nhập">
      <HandleIncome
        :isDark="isDark"
        :columnsHandleIncome="columnsHandleIncome"
        :dataHandleIncome="dataHandleIncome"
        :funds="funds"
        :totalIncome="totalIncome"
      />
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Tabs, TabPane } from "ant-design-vue";
import IncomeDebt from "@/components/IncomeDebt.vue";
import HandleIncome from "@/components/HandleIncome.vue";
import EstimateNecessity from "@/components/EstimateNecessity.vue";
import type { TableColumnType } from "ant-design-vue";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";
import type {
  EstimateNecessityType,
  HandleIncomeType,
  HandleIncomeItem,
} from "@/types/types";

export default {
  components: {
    ATabs: Tabs,
    ATabPane: TabPane,
    IncomeDebt,
    HandleIncome,
    EstimateNecessity,
    ConfigProvider,
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
  setup() {
    const store = useStore();
    const totalIncome = computed(() => store.getters.getTotalIncome);
    return { totalIncome };
  },
};
</script>
