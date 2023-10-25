<template>
  <div class="container mx-auto mt-12">
    <Funds :funds="funds" :totalIncome="totalIncome" />
    <InputFunds class="mb-4" :funds="funds" />
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
  </div>
</template>
<script lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { Col, Tabs, TabPane } from "ant-design-vue";
import Funds from "./components/Funds.vue";
import IncomeDebt from "./components/IncomeDebt.vue";
import HandleIncome from "./components/HandleIncome.vue";
import EstimateNecessity from "./components/EstimateNecessity.vue";
import InputFunds from "./components/InputFunds.vue";
import { calculateTotalIncome } from "@/utils/number.util";
import { db } from "@/main";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import {
  columnsIncome,
  dataIncome,
  columnsHandleIncome,
  dataHandleIncome,
} from "@/assets/data/sample";

export default {
  components: {
    ACol: Col,
    ATabs: Tabs,
    ATabPane: TabPane,
    Funds,
    IncomeDebt,
    HandleIncome,
    EstimateNecessity,
    InputFunds,
  },
  setup() {
    const totalIncomeStorage = ref(0);
    const totalIncome = computed(() => totalIncomeStorage.value);

    function handleUpdateTotalIncome(dataIncome: any) {
      totalIncomeStorage.value = calculateTotalIncome(dataIncome);
    }
    const funds: any = ref([
      {
        id: "",
        src: "",
        percentage: "",
        wallet: "",
        name: "",
        classColor: "",
      },
    ]);

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

    async function getFunds() {
      try {
        onSnapshot(
          query(
            collection(
              db,
              "users",
              "admin",
              "years",
              "2023",
              "months",
              "01-2023",
              "funds",
            ),
            orderBy("percentage", "desc"),
          ),
          (snap: any) => {
            snap.forEach((doc: any) => {
              const data = doc.data();
              const fund = {
                id: doc.id,
                ...data,
              };

              funds.value.push(fund);
            });
            localStorage.setItem("funds", JSON.stringify(funds.value));
          },
        );
      } catch (error) {
        alert("Get funds failed");
      }
    }

    onBeforeMount(async () => {
      await getFunds();
    });

    return {
      columnsIncome,
      dataIncome,
      totalIncome,
      columnsHandleIncome,
      dataHandleIncome,
      necessityLimitation,
      handleUpdateTotalIncome,
      funds,
    };
  },
};
</script>
