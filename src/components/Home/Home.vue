<template>
  <LoadingModal :isOpen="isOpenLoadingModal" />
  <CreateNewMonthModal
    :isOpen="isOpenCreateNewMonthModal"
    @action:updateNewMonthCreated="handleUpdateNewMonthCreated"
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
        />

        <Funds
          v-if="funds"
          class="mt-4"
          :funds="funds"
          @action:updateIsFundsEditable="handleUpdateIsFundsEditable"
        />
        <InputFunds v-if="isFundsEditable" class="mb-4" />
        <!-- Mobile View -->
        <div v-if="(isMobile || isTabletVertical) && dataIncome">
          <MobileAppView
            :necessityLimitation="necessityLimitation"
            :columnsIncome="columnsIncome"
            :columnsHandleIncome="columnsHandleIncome"
            :isDark="isDarkProps"
            :funds="funds"
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
            :columnsHandleIncome="columnsHandleIncome"
            :isDark="isDarkProps"
            :funds="funds"
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
    <button @click="handleCreateNewMonth">Create new month</button>
  </div>
</template>
<script lang="ts">
//#region import
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useDark, useToggle } from "@vueuse/core";
import { Col, Tabs, TabPane, Table } from "ant-design-vue";

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

import { getDebt } from "@/composables/debt/index.js";
import { getFunds } from "@/composables/funds/index.js";
import { getIncomes } from "@/composables/incomes/index.js";
import { getHandleIncomes } from "@/composables/handleIncomes/index.js";
import { getAllHandleIncomesIsDebt } from "@/composables/collection/index.js";
import { getEstimateNecessityExpenses } from "@/composables/estimateNecessity/index.js";
import { columnsIncome, columnsHandleIncome } from "@/assets/data/sample";
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
    CreateNewMonthModal,
    Debt,
  },
  setup() {
    const store = useStore();
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

    const { email: user } = JSON.parse(localStorage.getItem("user") ?? "");
    const funds = computed(() => store.getters.getFunds);
    const dataIncome = computed(() => store.getters.getIncomes);
    const totalIncome = computed(() => store.getters.getTotalIncome);
    const currentChooseMonth = computed(() => store.getters.getCurrentChooseMonth)
    const { isMobile, isTabletVertical, isTabletHorizontal, isDesktop } =
      detectDevice();

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

    const isFundsEditable = ref(false);
    function handleUpdateIsFundsEditable() {
      isFundsEditable.value = !isFundsEditable.value;
    }

    async function handleCreateNewMonth() {
      isOpenCreateNewMonthModal.value = open();
    }

    async function handleUpdateNewMonthCreated(value: any) {
      newMonthCreated.value = value;
    }

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

    async function handleUpdateIsOpenCreateNewMonthModal() {
      isOpenCreateNewMonthModal.value = close();
    }

    watch(currentChooseMonth, async () => {
      await getMasterData(currentChooseMonth.value.year, currentChooseMonth.value.monthYear);

      const isExistMonth = computed(() => dataIncome.value.length > 0);
      
      if (!isExistMonth.value) {
        toast.error(
          "Tháng này chưa có dữ liệu.",
        );
      }
    })

    return {
      columnsIncome,
      dataIncome,
      columnsHandleIncome,
      necessityLimitation,
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
