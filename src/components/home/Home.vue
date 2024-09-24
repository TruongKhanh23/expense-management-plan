<template>
  <LoadingModal :isOpen="isOpenLoadingModal" />
  <div class="xl:mx-[8rem] mx-4 min-h-[900px] md:min-h-[750px]">
    <a-tabs centered class="dark:text-[#ffffff]">
      <a-tab-pane key="1" tab="Quản lý chi tiêu">
        <div class="mb-32">
          <ChooseMonth class="mt-4 mb-8" />

          <Funds v-if="funds" class="mt-4" :funds="funds" />
          <InputFunds v-if="isFundsEditable" class="mb-4" />
          <!-- Mobile View -->
          <div v-if="(isMobile || isTabletVertical) && dataIncome">
            <MobileAppView />
          </div>

          <!-- Desktop View-->
          <div
            v-if="(isDesktop || isTabletHorizontal) && dataIncome"
            class="flex flex-col md:flex-row my-4"
          >
            <DesktopAppView />
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Danh sách vật dụng" force-render>
        <div class="flex justify-center items-center">
          <a-col :sm="{ span: spanNecessary }">
            <NecessaryThings />
          </a-col>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Nợ" force-render>
        <div class="flex justify-center items-start min-h-[150vh]">
          <a-col :md="{ span: 12 }">
            <Debt />
          </a-col>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
  <Footer />
</template>
<script lang="ts">
//#region import
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { Col, Tabs, TabPane, Table } from "ant-design-vue";

import Funds from "@/components/fund/Funds.vue";
import IncomeDebt from "@/components/income/IncomeDebt.vue";
import HandleIncome from "@/components/handleIncome/HandleIncome.vue";
import EstimateNecessity from "@/components/estimateNecessity/EstimateNecessity.vue";
import InputFunds from "@/components/fund/InputFunds.vue";
import DesktopAppView from "@/components/global/DesktopAppView.vue";
import MobileAppView from "@/components/global/MobileAppView.vue";
import NecessaryThings from "@/components/necessity/NecessaryThings.vue";
import Debt from "@/components/debt/Debt.vue";
import ChooseMonth from "@/components/month/ChooseMonth.vue";
import LoadingModal from "@/components/reusable/LoadingModal.vue";
import Footer from "@/components/layoutElements/Footer.vue";

import { getDebt } from "@/composables/debt/index.js";
import { getFunds } from "@/composables/funds/index.js";
import { getIncomes } from "@/composables/incomes/index.js";
import { getHandleIncomes } from "@/composables/handleIncomes/index.js";
import { getAllHandleIncomesIsDebt } from "@/composables/collection/index.js";
import { getEstimateNecessityExpenses } from "@/composables/estimateNecessity/index.js";
import { getNecessaryThings } from "@/composables/necessaryThings/index.js";
import { getNecessaryThingsType } from "@/composables/necessaryThings/index.js";
import { handlePopup, open, close } from "@/composables/loadingModal/index.js";
import { toast } from "vue3-toastify";

import detectDevice from "@/utils/device.util";
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
    DesktopAppView,
    MobileAppView,
    LoadingModal,
    NecessaryThings,
    ChooseMonth,
    Debt,
    Footer,
  },
  setup() {
    const store = useStore();

    const { isOpenLoadingModal } = handlePopup();
    const { isMobile, isTabletVertical, isTabletHorizontal, isDesktop } =
      detectDevice();

    const spanNecessary = isMobile ? 16 : 30;

    const user = computed(() => {
      const currentUser = store.getters.getUser;
      return currentUser.email;
    });

    const funds = computed(() => store.getters.getFunds);
    const dataIncome = computed(() => store.getters.getIncomes);
    const isFundsEditable = computed(() => store.getters.getIsFundsEditable);
    const currentChooseMonth = computed(
      () => store.getters.getCurrentChooseMonth,
    );

    (async () => {
      const { currentYear, currentMonthYear } = getCurrentTime();
      setCurrentChooseMonth(currentYear, currentMonthYear);

      try {
        await Promise.all([
          getFunds(currentYear, currentMonthYear, user.value),
          getIncomes(currentYear, currentMonthYear, user.value),
          getHandleIncomes(currentYear, currentMonthYear, user.value),
          getEstimateNecessityExpenses(
            currentYear,
            currentMonthYear,
            user.value,
          ),
          getDebt(),
          getAllHandleIncomesIsDebt(),
          getNecessaryThings(),
          getNecessaryThingsType(),
        ]);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    })();

    async function getMasterData(year: any, monthYear: any) {
      isOpenLoadingModal.value = open();

      await getFunds(year, monthYear, user.value);
      await getIncomes(year, monthYear, user.value);
      await getHandleIncomes(year, monthYear, user.value);
      await getEstimateNecessityExpenses(year, monthYear);

      setTimeout(() => {
        isOpenLoadingModal.value = close();
      }, 500);
    }

    watch(currentChooseMonth, async () => {
      await getMasterData(
        currentChooseMonth.value.year,
        currentChooseMonth.value.monthYear,
      );
    });

    watch(dataIncome, () => {
      const isExistMonth = dataIncome.value.length > 0;

      if (!isExistMonth) {
        toast.error("Tháng này chưa có dữ liệu.");
      }
    });

    return {
      dataIncome,
      funds,
      isFundsEditable,
      isMobile,
      isTabletVertical,
      isTabletHorizontal,
      isDesktop,
      isOpenLoadingModal,
      spanNecessary,
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
