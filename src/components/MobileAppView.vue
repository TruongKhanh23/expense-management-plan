<template>
  <a-tabs centered class="dark:text-[#ffffff]">
    <a-tab-pane key="1" tab="Dự chi thiết yếu">
      <EstimateNecessity
        :data="dataEstimateNecessity"
      />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Thu nhập" force-render>
      <IncomeDebt
        class="md:border-l md:border-r px-4"
        :totalIncome="totalIncome"
        :isDark="isDark"
      />
    </a-tab-pane>
    <a-tab-pane key="3" tab="Xử lý thu nhập">
      <HandleIncome
        :isDark="isDark"
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
import type { HandleIncomeItem } from "@/types/types";

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
    columnsHandleIncome: {
      type: Array as () => TableColumnType<HandleIncomeItem>[],
      default: () => [],
    },
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
  },
  setup() {
    const store = useStore();
    const totalIncome = computed(() => store.getters.getTotalIncome);
    const dataEstimateNecessity = computed(
      () => store.getters.getEstimateNecessities,
    );
    return { totalIncome, dataEstimateNecessity };
  },
};
</script>
