<template>
  <LoadingModal :isOpen="isOpenLoadingModal" />
  <div class="xl:mx-[8rem] mx-4 my-12 min-h-[750px]">
    <Funds
      v-if="funds"
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
        :dataHandleIncome="dataHandleIncome"
        :isDark="isDarkProps"
        @action:updateDataTotalIncome="handleUpdateTotalIncome"
      />
    </div>
  </div>
  <div
    class="flex flex-col md:flex-row mb-12 gap-4 items-center justify-center"
  >
    <div class="flex items-center justify-center">
      <ThemeSwitcher :isDark="isDarkProps" @action:toggleDark="toggleDark" />
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
import DesktopAppView from "@/components/DesktopAppView.vue";
import MobileAppView from "@/components/MobileAppView.vue";
import { calculateTotalIncome } from "@/utils/number.util";
import { getFunds } from "@/composables/funds/index.js";
import { getIncomes } from "@/composables/incomes/index.js";
import { getHandleIncomes } from "@/composables/handleIncomes/index.js";
import { columnsIncome, columnsHandleIncome } from "@/assets/data/sample";
import LoadingModal from "@/components/reusable/LoadingModal.vue";
import detectDevice from "@/utils/device.util";
import handlePopup from "@/composables/loadingModal/index.js";
import { useDark, useToggle } from "@vueuse/core";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";

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
    DesktopAppView,
    MobileAppView,
    LoadingModal,
    ThemeSwitcher,
  },
  setup() {
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
  @apply bg-slate-50 text-slate-800 dark:bg-[#181A1B] dark:text-[#DDDDDD];
}
</style>
