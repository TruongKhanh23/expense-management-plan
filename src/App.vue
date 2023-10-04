<template>
  <div class="container mx-auto mt-12">
    <Funds :funds="funds" :totalIncome="totalIncome" />

    <!-- Mobile View -->
    <div class="md:hidden">
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
    <div class="flex flex-col md:flex-row hidden md:flex">
      <a-col :md="{ span: 6 }">
        <EstimateNecessity :necessityLimitation="necessityLimitation" />
      </a-col>

      <a-col :md="{ span: 8 }">
        <IncomeDebt
          class="md:border-l md:border-r px-4"
          :columns="columnsIncome"
          :data="dataIncome"
          :totalIncome="totalIncome"
        />
      </a-col>

      <a-col :md="{ span: 10 }">
        <HandleIncome
          :columnsHandleIncome="columnsHandleIncome"
          :dataHandleIncome="dataHandleIncome"
        />
      </a-col>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { Col, Tabs, TabPane } from "ant-design-vue";
import Funds from "./components/Funds.vue";
import IncomeDebt from "./components/IncomeDebt.vue";
import HandleIncome from "./components/HandleIncome.vue";
import EstimateNecessity from "./components/EstimateNecessity.vue";
import {
  columnsIncome,
  dataIncome,
  columnsHandleIncome,
  dataHandleIncome,
  funds,
} from "@/assets/data/sample";

type DataIncomeType = {
  key: string;
  source: string;
  amount: number;
};

export default {
  components: {
    ACol: Col,
    ATabs: Tabs,
    ATabPane: TabPane,
    Funds,
    IncomeDebt,
    HandleIncome,
    EstimateNecessity,
  },
  setup() {
    const totalIncome = calculateTotalAmount(dataIncome);

    function calculateTotalAmount(data: DataIncomeType[]) {
      let totalAmount = 0;

      for (const element of data) {
        totalAmount += element.amount;
      }

      return totalAmount;
    }

    // Calculate  Necessity Limitation
    const necessityItem = funds.find((item) => item.id === "necessity") ?? {
      percentage: 0,
    };
    const necessityLimitation = ref(0);
    if (
      typeof necessityItem.percentage === "number" &&
      typeof totalIncome === "number"
    ) {
      necessityLimitation.value =
        (necessityItem.percentage * totalIncome) / 100;
    }

    return {
      columnsIncome,
      dataIncome,
      funds,
      totalIncome,
      columnsHandleIncome,
      dataHandleIncome,
      necessityLimitation,
    };
  },
};
</script>
