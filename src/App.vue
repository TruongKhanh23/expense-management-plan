<template>
  <div class="xl:mx-[8rem] mx-4 my-12">
    <Funds
      v-if="funds"
      :funds="funds"
      :totalIncome="totalIncome"
      @action:updateIsFundsEditable="handleUpdateIsFundsEditable"
    />
    <InputFunds v-if="isFundsEditable" class="mb-4" :funds="funds" />
    <!-- Mobile View -->
    <div v-if="(isMobile || isTabletVertical) && dataIncome">
      <a-tabs centered>
        <a-tab-pane key="1" tab="Dự chi thiết yếu">
          <EstimateNecessity
            v-if="necessityLimitation"
            :necessityLimitation="necessityLimitation"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Thu nhập" force-render>
          <IncomeDebt
            class="md:border-l md:border-r px-4"
            :columns="columnsIncome"
            :data="dataIncome"
            :totalIncome="totalIncome"
            @action:updateDataTotalIncome="handleUpdateTotalIncome"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Xử lý thu nhập">
          <HandleIncome
            :columnsHandleIncome="columnsHandleIncome"
            :dataHandleIncome="dataHandleIncome"
          />
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- Desktop View-->
    <div
      v-if="(isDesktop || isTabletHorizontal) && dataIncome"
      class="flex flex-col md:flex-row my-4"
    >
      <a-col :md="{ span: 6 }">
        <EstimateNecessity :necessityLimitation="necessityLimitation" />
      </a-col>

      <a-col :md="{ span: 8 }">
        <IncomeDebt
          class="md:border-l md:border-r px-4"
          :columns="columnsIncome"
          :data="dataIncome"
          :totalIncome="totalIncome"
          @action:updateDataTotalIncome="handleUpdateTotalIncome"
        />
      </a-col>

      <a-col :md="{ span: 10 }">
        <HandleIncome
          :columnsHandleIncome="columnsHandleIncome"
          :dataHandleIncome="dataHandleIncome"
        />
      </a-col>
    </div>
    <Footer />
  </div>
</template>
<script lang="ts">
import { ref, computed } from "vue";
import { Col, Tabs, TabPane } from "ant-design-vue";
import Funds from "./components/Funds.vue";
import IncomeDebt from "./components/IncomeDebt.vue";
import HandleIncome from "./components/HandleIncome.vue";
import EstimateNecessity from "./components/EstimateNecessity.vue";
import InputFunds from "./components/InputFunds.vue";
import Footer from "@/components/Footer.vue";
import { calculateTotalIncome } from "@/utils/number.util";
import { getFunds } from "@/composables/funds/index.js";
import { getIncomes } from "@/composables/incomes/index.js";
import { getHandleIncomes } from "@/composables/handleIncomes/index.js";
import { columnsIncome, columnsHandleIncome } from "@/assets/data/sample";

import detectDevice from "@/utils/device.util";

export default {
  components: {
    ACol: Col,
    ATabs: Tabs,
    ATabPane: TabPane,
    Funds,
    IncomeDebt,
    EstimateNecessity,
    InputFunds,
    HandleIncome,
    Footer,
  },
  setup() {
    const funds: any = ref([]);
    const dataIncome: any = ref([]);
    const dataHandleIncome: any = ref([]);
    const totalIncome = ref(0);
    const { isMobile, isTabletVertical, isTabletHorizontal, isDesktop } =
      detectDevice();

    function handleUpdateTotalIncome(dataIncome: any) {
      totalIncome.value = calculateTotalIncome(dataIncome);
    }

    // Calculate Necessity Limitation
    const necessityItem = computed(() => {
      return (
        funds.value.find((item: any) => item.id === "necessity") ?? {
          percentage: 0,
        }
      );
    });
    const necessityLimitation = computed(() => {
      return typeof necessityItem.value.percentage === "number" &&
        typeof totalIncome.value === "number"
        ? (necessityItem.value.percentage * totalIncome.value) / 100
        : 0;
    });

    (async () => {
      funds.value = await getFunds();
      dataIncome.value = await getIncomes();
      dataHandleIncome.value = await getHandleIncomes();
    })();

    const isFundsEditable = ref(false);
    function handleUpdateIsFundsEditable() {
      isFundsEditable.value = !isFundsEditable.value;
    }

    return {
      columnsIncome,
      dataIncome,
      totalIncome,
      columnsHandleIncome,
      dataHandleIncome,
      necessityLimitation,
      handleUpdateTotalIncome,
      handleUpdateIsFundsEditable,
      funds,
      isFundsEditable,
      isMobile,
      isTabletVertical,
      isTabletHorizontal,
      isDesktop,
    };
  },
};
</script>
