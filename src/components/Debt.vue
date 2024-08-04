<template>
  <div class="flex items-center justify-between">
    <p class="my-2 font-bold">
      Tổng:
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
            {{
              new Intl.NumberFormat().format(
                getRemainingDebtByDebtId(
                  totalAmountByDebtId,
                  record.key,
                  record.amount,
                ),
              )
            }}
          </p>
        </template>
      </template>
    </a-table>
    <DebtEdit v-else :data="data" @action:updateDebts="handleUpdateDebts" />
  </ConfigProvider>
</template>
<script lang="ts">
import { ref, computed } from "vue";
import { Col, Table, Tag, Switch } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";
import { columnsDebt } from "@/assets/data/sample";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";
import DebtEdit from "@/components/DebtEdit.vue";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { calculateTotalAmountByDebtId } from "@/composables/handleIncomes/index";

import { roundDecimals } from "@/utils/number.util";

type DebtItem = {
  key: string;
  name: string;
  amount: number;
  startDate: string | Dayjs;
  isFinished: string;
};

export default {
  components: {
    ATag: Tag,
    ATable: Table,
    ACol: Col,
    ConfigProvider,
    DebtEdit,
    ASwitch: Switch,
  },
  props: {
    debt: {
      type: Array as () => DebtItem[],
      default: () => [],
    },
    allHandleIncomesIsDebt: {
      type: Array,
      default: () => [],
    },
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
  },
  emits: ["action:updateDebts"],
  setup(props, { emit }) {
    const isEditable = ref(false);
    const isDarkMode = props.isDark;

    const totalAmountByDebtId = computed(() =>
      calculateTotalAmountByDebtId(props.allHandleIncomesIsDebt),
    );

    const columns: TableColumnType<DebtItem>[] =
      columnsDebt as TableColumnType<DebtItem>[];

    const data: any = computed(() => {
      return props.debt.filter((item) => item.isFinished === "false");
    });

    const handleUpdateDebts = (newDebts: any) => {
      emit("action:updateDebts", newDebts);
    };

    function calculateTotal(values: any) {
      let total = 0;
      for (const item of values) {
        total += item.amount;
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
      roundDecimals,
      totalAmountByDebtId,
      getRemainingDebtByDebtId,
      handleUpdateDebts,
      dayjs,
    };
  },
};
</script>
