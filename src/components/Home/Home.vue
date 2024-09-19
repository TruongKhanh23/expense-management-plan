<template>
  <LoadingModal :isOpen="isOpenLoadingModal" />
  <div class="xl:mx-[8rem] mx-4 min-h-[750px]">
    <a-tabs centered class="dark:text-[#ffffff]">
      <a-tab-pane key="1" tab="Quản lý chi tiêu">
        <ChooseMonth class="mt-4 mb-8" :isDark="isDarkProps" />

        <Funds v-if="funds" class="mt-4" :funds="funds" />
        <InputFunds v-if="isFundsEditable" class="mb-4" />
        <!-- Mobile View -->
        <div v-if="(isMobile || isTabletVertical) && dataIncome">
          <MobileAppView :isDark="isDarkProps" />
        </div>

        <!-- Desktop View-->
        <div
          v-if="(isDesktop || isTabletHorizontal) && dataIncome"
          class="flex flex-col md:flex-row my-4"
        >
          <DesktopAppView :isDark="isDarkProps" />
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
            <Debt :isDark="isDarkProps" />
          </a-col>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
  <div
    class="flex flex-col md:flex-row my-12 gap-4 items-center justify-center"
  >
    <div class="flex items-center justify-center">
      <ThemeSwitcher :isDark="isDarkProps" @action:toggleDark="toggleDark" />
    </div>
    <Footer />
    <CreateNewMonth />
  </div>
</template>
<script lang="ts">
//#region import
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useDark, useToggle } from "@vueuse/core";
import { Col, Tabs, TabPane, Table } from "ant-design-vue";

import Funds from "@/components/Fund/Funds.vue";
import IncomeDebt from "@/components/Income/IncomeDebt.vue";
import HandleIncome from "@/components/HandleIncome/HandleIncome.vue";
import EstimateNecessity from "@/components/EstimateNecessity/EstimateNecessity.vue";
import InputFunds from "@/components/InputFunds.vue";
import Footer from "@/components/Footer.vue";
import DesktopAppView from "@/components/DesktopAppView.vue";
import MobileAppView from "@/components/MobileAppView.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import NecessaryThings from "@/components/Necessity/NecessaryThings.vue";
import Debt from "@/components/Debt/Debt.vue";
import ChooseMonth from "@/components/Month/ChooseMonth.vue";
import LoadingModal from "@/components/reusable/LoadingModal.vue";
import CreateNewMonth from "@/components/Month/CreateNewMonth.vue";

import { getDebt } from "@/composables/debt/index.js";
import { getFunds } from "@/composables/funds/index.js";
import { getIncomes } from "@/composables/incomes/index.js";
import { getHandleIncomes } from "@/composables/handleIncomes/index.js";
import { getAllHandleIncomesIsDebt } from "@/composables/collection/index.js";
import { getEstimateNecessityExpenses } from "@/composables/estimateNecessity/index.js";
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
    Footer,
    DesktopAppView,
    MobileAppView,
    LoadingModal,
    ThemeSwitcher,
    NecessaryThings,
    ChooseMonth,
    CreateNewMonth,
    Debt,
  },
  setup() {
    const store = useStore();
    const { isOpenLoadingModal } = handlePopup();
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

    const { email: user } = JSON.parse(localStorage.getItem("user") ?? "");
    const funds = computed(() => store.getters.getFunds);
    const dataIncome = computed(() => store.getters.getIncomes);
    const currentChooseMonth = computed(
      () => store.getters.getCurrentChooseMonth,
    );
    const { isMobile, isTabletVertical, isTabletHorizontal, isDesktop } =
      detectDevice();

    (async () => {
      const { currentYear, currentMonthYear } = getCurrentTime();
      setCurrentChooseMonth(currentYear, currentMonthYear);

      try {
        await Promise.all([
          getFunds(currentYear, currentMonthYear, user),
          getIncomes(currentYear, currentMonthYear, user),
          getHandleIncomes(currentYear, currentMonthYear, user),
          getEstimateNecessityExpenses(currentYear, currentMonthYear, user),
          getDebt(),
          getAllHandleIncomesIsDebt(),
        ]);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    })();

    const isFundsEditable = computed(() => store.getters.getIsFundsEditable);

    async function getMasterData(year: any, monthYear: any) {
      isOpenLoadingModal.value = open();

      await getFunds(year, monthYear, user);
      await getIncomes(year, monthYear, user);
      await getHandleIncomes(year, monthYear, user);
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
      isDark,
      toggleDark,
      isDarkProps,
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
