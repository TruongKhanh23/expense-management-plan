<template>
  <div class="flex items-center justify-between">
    <p class="my-2 font-bold">
      Tổng nợ còn lại:
      {{ new Intl.NumberFormat().format(calculateTotal(data)) }}
    </p>
    <div class="flex flex-row my-2">
      <p class="font-bold mr-2 hidden md:flex">Chỉnh sửa:</p>
      <a-switch class="my-ant-switch" v-model:checked="isEditable" />
    </div>
  </div>
  <ConfigProvider :isDark="isDarkMode">
    <a-table
      v-if="!isEditable"
      :columns="columns"
      :data-source="data"
      :pagination="{ hideOnSinglePage: true }"
      class="md:min-h-screen"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <p>{{ record.name }}</p>
        </template>
        <template v-if="column.dataIndex === 'amount'">
          <p>{{ new Intl.NumberFormat().format(record.amount) }}</p>
        </template>
        <template v-if="column.dataIndex === 'startDate'">
          <p>
            {{ dayjs(record.startDate, "YYYY-MM-DD").format("DD/MM/YY") }}
          </p>
        </template>
        <template v-if="column.dataIndex === 'isFinished'">
          <p>
            {{ record.isFinished === "false" ? "Chưa trả hết" : "Đã trả xong" }}
          </p>
        </template>
        <template v-if="column.dataIndex === 'remaining'">
          <p>
            {{ new Intl.NumberFormat().format(record.remaining ?? 0) }}
          </p>
        </template>
      </template>
    </a-table>
    <DebtEdit v-else :data="data" />
  </ConfigProvider>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Col, Table, Tag, Switch } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import { columnsDebt, columnsDebtMobile } from "@/assets/data/sample";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";
import DebtEdit from "@/components/debt/DebtEdit.vue";
import dayjs from "dayjs";
import { calculateTotalAmountByDebtId } from "@/composables/handleIncomes/index";
import type { DebtItem } from "@/types/types";
import detectDevice from "@/utils/device.util";

export default {
  components: {
    ATag: Tag,
    ATable: Table,
    ACol: Col,
    ConfigProvider,
    DebtEdit,
    ASwitch: Switch,
  },
  setup() {
    const store = useStore();
    const { isMobile } = detectDevice();
    const isEditable = ref(false);
    const isDarkMode = computed(() => store.getters.getIsDark);

    const debts = computed(() => store.getters.getDebts);
    const allHandleIncomesIsDebt = computed(
      () => store.getters.getAllHandleIncomesIsDebt,
    );

    const totalAmountByDebtId = computed(() =>
      calculateTotalAmountByDebtId(allHandleIncomesIsDebt.value),
    );

    const columns: TableColumnType<DebtItem>[] = isMobile
      ? columnsDebtMobile
      : (columnsDebt as TableColumnType<DebtItem>[]);

    const data: any = computed(() => {
      const filteredData = debts.value.filter(
        (item) => item.isFinished === "false",
      );

      const dataWithRemaining = filteredData.map((item) => ({
        ...item,
        remaining: getRemainingDebtByDebtId(
          totalAmountByDebtId.value,
          item.key,
          item.amount,
        ),
      }));

      return dataWithRemaining.filter((item) => item.remaining !== 0);
    });

    function calculateTotal(values: any) {
      let total = 0;
      for (const item of values) {
        total += item.remaining;
      }

      return total;
    }

    function getRemainingDebtByDebtId(
      totalAmountByDebtId: any,
      key: any,
      amount: any,
    ) {
      const item =
        totalAmountByDebtId.find(
          (item: { debtId: any }) => item.debtId === key,
        ) ?? {};

      const totalAmount = item.totalAmount ?? 0;
      const remaining = amount - totalAmount;

      return remaining;
    }

    return {
      isDarkMode,
      data,
      columns,
      isEditable,
      calculateTotal,
      totalAmountByDebtId,
      getRemainingDebtByDebtId,
      dayjs,
    };
  },
};
</script>
