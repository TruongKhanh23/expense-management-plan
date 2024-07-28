<template>
  <LoadingModal :isOpen="isOpenLoadingModal" />
  <CreateNewMonthModal
    :isOpen="isOpenCreateNewMonthModal"
    @action:updateNewMonthCreated="handleUpdateNewMonthCreated"
    @action:updateMonth="handleUpdateMonth"
    @action:updateIsOpenCreateNewMonthModal="
      handleUpdateIsOpenCreateNewMonthModal
    "
  />
  <div class="xl:mx-[8rem] mx-4 min-h-[750px]">
    <a-tabs centered class="dark:text-[#ffffff]">
      <a-tab-pane key="1" tab="Quản lý chi tiêu">
        <ChooseMonth
          class="mt-4 mb-8"
          :isDark="isDarkProps"
          :newMonthCreated="newMonthCreated"
          @action:updateMonth="handleUpdateMonth"
        />

        <Funds
          v-if="funds"
          class="mt-4"
          :funds="funds"
          :totalIncome="totalIncome"
          @action:updateIsFundsEditable="handleUpdateIsFundsEditable"
        />
        <InputFunds v-if="isFundsEditable" class="mb-4" :funds="funds" />
        <!-- Mobile View -->
        <div v-if="(isMobile || isTabletVertical) && dataIncome">
          <MobileAppView
            :necessityLimitation="necessityLimitation"
            :columnsIncome="columnsIncome"
            :dataIncome="dataIncome"
            :totalIncome="totalIncome"
            :columnsHandleIncome="columnsHandleIncome"
            :dataHandleIncome="dataHandleIncome"
            :dataEstimateNecessity="dataEstimateNecessity"
            :isDark="isDarkProps"
            @action:updateDataTotalIncome="handleUpdateTotalIncome"
          />
        </div>

        <!-- Desktop View-->
        <div
          v-if="(isDesktop || isTabletHorizontal) && dataIncome"
          class="flex flex-col md:flex-row my-4"
        >
          <DesktopAppView
            :necessityLimitation="necessityLimitation"
            :columnsIncome="columnsIncome"
            :dataIncome="dataIncome"
            :totalIncome="totalIncome"
            :columnsHandleIncome="columnsHandleIncome"
            :dataEstimateNecessity="dataEstimateNecessity"
            :dataHandleIncome="dataHandleIncome"
            :isDark="isDarkProps"
            @action:updateDataTotalIncome="handleUpdateTotalIncome"
          />
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Danh sách vật dụng" force-render>
        <div class="flex justify-center items-center">
          <a-col :md="{ span: 12 }">
            <NecessaryThings :isDark="isDarkProps" />
          </a-col>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Nợ" force-render>
        <div class="flex justify-center items-center">
          <a-col :md="{ span: 12 }">
            <Debt
              :isDark="isDarkProps"
              :debt="debt"
              :allHandleIncomesIsDebt="allHandleIncomesIsDebt"
            />
          </a-col>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
  <div
    class="flex flex-col md:flex-row mb-12 gap-4 items-center justify-center"
  >
    <div class="flex items-center justify-center">
      <ThemeSwitcher :isDark="isDarkProps" @action:toggleDark="toggleDark" />
    </div>
    <Footer />
    <button @click="handleCreateNewMonth">Create new month</button>
  </div>
</template>
<script lang="ts">
//#region import
import { ref, computed } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { Col, Tabs, TabPane, Table } from "ant-design-vue";

import { getHandleIncomesAllYears } from "@/composables/collection/index.js";
import Funds from "@/components/Funds.vue";
import IncomeDebt from "@/components/IncomeDebt.vue";
import HandleIncome from "@/components/HandleIncome.vue";
import EstimateNecessity from "@/components/EstimateNecessity.vue";
import InputFunds from "@/components/InputFunds.vue";
import Footer from "@/components/Footer.vue";
import DesktopAppView from "@/components/DesktopAppView.vue";
import MobileAppView from "@/components/MobileAppView.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import NecessaryThings from "@/components/NecessaryThings.vue";
import Debt from "@/components/Debt.vue";
import ChooseMonth from "@/components/ChooseMonth.vue";
import LoadingModal from "@/components/reusable/LoadingModal.vue";
import CreateNewMonthModal from "@/components/CreateNewMonthModal.vue";

import { getFunds } from "@/composables/funds/index.js";
import { getIncomes } from "@/composables/incomes/index.js";
import { getHandleIncomes } from "@/composables/handleIncomes/index.js";
import { getEstimateNecessityExpenses } from "@/composables/estimateNecessity/index.js";
import { getDebt } from "@/composables/debt/index.js";
import { columnsIncome, columnsHandleIncome } from "@/assets/data/sample";
import { handlePopup, open, close } from "@/composables/loadingModal/index.js";

import detectDevice from "@/utils/device.util";
import { calculateTotalIncome } from "@/utils/number.util";
import { getCurrentTime, setCurrentChooseMonth } from "@/utils/time.util";
//#endregion

export default {
  components: {
    ACol: Col,
    ATabs: Tabs,
    ATabPane: TabPane,
    ATable: Table,
    Funds,
    IncomeDebt,
    EstimateNecessity,
    InputFunds,
    HandleIncome,
    Footer,
    DesktopAppView,
    MobileAppView,
    LoadingModal,
    ThemeSwitcher,
    NecessaryThings,
    ChooseMonth,
    CreateNewMonthModal,
    Debt,
  },
  setup() {
    const { isOpenLoadingModal } = handlePopup();
    const isOpenCreateNewMonthModal = ref(false);
    const newMonthCreated = ref<string>();
    const isDark = useDark({
      onChanged(isDark) {
        if (isDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    });
    const toggleDark = useToggle(isDark);
    const isDarkProps = computed(() => {
      return isDark;
    });

    const funds: any = ref([]);
    const dataIncome: any = ref([]);
    const dataHandleIncome: any = ref([]);
    const dataEstimateNecessity: any = ref([]);
    const allHandleIncomesIsDebt: any = ref([]);
    const debt: any = ref([]);
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
      const { currentYear, currentMonthYear } = getCurrentTime();
      setCurrentChooseMonth(currentYear, currentMonthYear);

      funds.value = await getFunds(currentYear, currentMonthYear);
      dataIncome.value = await getIncomes(currentYear, currentMonthYear);
      dataHandleIncome.value = await getHandleIncomes(
        currentYear,
        currentMonthYear,
      );
      dataEstimateNecessity.value = await getEstimateNecessityExpenses(
        currentYear,
        currentMonthYear,
      );
      allHandleIncomesIsDebt.value = (await getHandleIncomesAllYears()).filter(
        (item) => item.isDebt === "true",
      );

      debt.value = await getDebt();
    })();

    const isFundsEditable = ref(false);
    function handleUpdateIsFundsEditable() {
      isFundsEditable.value = !isFundsEditable.value;
    }

    async function handleCreateNewMonth() {
      isOpenCreateNewMonthModal.value = open();
    }

    async function handleUpdateMonth(year: any, monthYear: any) {
      await getMasterData(year, monthYear);
    }

    async function handleUpdateNewMonthCreated(value: any) {
      newMonthCreated.value = value;
    }

    async function getMasterData(year: any, monthYear: any) {
      isOpenLoadingModal.value = open();

      funds.value = await getFunds(year, monthYear);
      dataIncome.value = await getIncomes(year, monthYear);
      dataHandleIncome.value = await getHandleIncomes(year, monthYear);
      dataEstimateNecessity.value = await getEstimateNecessityExpenses(
        year,
        monthYear,
      );

      setTimeout(() => {
        isOpenLoadingModal.value = close();
      }, 500);
    }

    async function handleUpdateIsOpenCreateNewMonthModal() {
      isOpenCreateNewMonthModal.value = close();
    }

    return {
      columnsIncome,
      dataIncome,
      totalIncome,
      columnsHandleIncome,
      dataHandleIncome,
      dataEstimateNecessity,
      allHandleIncomesIsDebt,
      debt,
      necessityLimitation,
      handleUpdateTotalIncome,
      handleUpdateIsFundsEditable,
      funds,
      isFundsEditable,
      isMobile,
      isTabletVertical,
      isTabletHorizontal,
      isDesktop,
      isOpenLoadingModal,
      isDark,
      toggleDark,
      isDarkProps,
      handleCreateNewMonth,
      handleUpdateMonth,
      isOpenCreateNewMonthModal,
      handleUpdateIsOpenCreateNewMonthModal,
      handleUpdateNewMonthCreated,
      newMonthCreated,
    };
  },
};
</script>
<style>
html.dark {
  color-scheme: dark;
}
body {
  @apply bg-[white] text-slate-800 dark:bg-[#181A1B] dark:text-[#DDDDDD];
}
</style>
