<template>
  <div class="px-4">
    <Slider
      :list="reorderedData"
      :attrs="{
        perPage: 1,
        arrows: false,
        gap: 8,
        pagination: false,
      }"
    >
      <template #content="{ data, index }">
        <div class="flex items-center justify-between">
          <p class="my-2 font-bold">
            Tổng:
            {{ new Intl.NumberFormat().format(calculateTotal(data.items)) }}
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
            :data-source="data.items"
            :key="index"
            @change="onChange"
            :pagination="{ hideOnSinglePage: true }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'isSolved'">
                <input
                  type="checkbox"
                  :id="record.isSolved"
                  @change="(e) => onCheckboxChange(e, record)"
                  :checked="record.isSolved"
                />
              </template>
              <template v-if="column.dataIndex === 'amount'">
                <a>{{ new Intl.NumberFormat().format(record.amount) }}</a>
              </template>
              <template v-if="column.dataIndex === 'type'">
                <div class="flex flex-col">
                  <p class="text-center">{{ record.wallet }}</p>
                  <a-tag :color="tagColor(record.type)" class="text-center">{{
                    record.type
                  }}</a-tag>
                </div>
              </template>
            </template>
          </a-table>
          <HandleIncomeEdit
            v-else
            :data="data.items"
            :funds="funds"
            :totalIncome="totalIncome"
          />
        </ConfigProvider>
      </template>
    </Slider>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { Table, Tag, Switch } from "ant-design-vue";
import type { TableColumnType, TableProps } from "ant-design-vue";
import { setHandleIncomes } from "@/composables/handleIncomes/index.js";
import HandleIncomeEdit from "@/components/handleIncome/HandleIncomeEdit.vue";
import Slider from "@/components/reusable/Slider.vue";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";
import type { HandleIncomeItem } from "@/types/types";
import { columnsHandleIncome } from "@/assets/data/sample";

export default {
  components: {
    ATag: Tag,
    ATable: Table,
    ASwitch: Switch,
    HandleIncomeEdit,
    Slider,
    ConfigProvider,
  },
  props: {
    totalIncome: {
      type: Number,
      require: true,
    },
  },
  setup() {
    const store = useStore();
    const funds = computed(() => store.getters.getFunds);
    const isDarkMode = computed(() => store.getters.getIsDark);
    const isEditable = ref(false);
    const tagTypeColor: Record<string, string> = {
      necessity: "pink",
      freedom: "blue",
      enjoy: "green",
      education: "purple",
      giving: "default",
      longTermSaving: "orange",
    };

    function tagColor(type: string) {
      if (type in tagTypeColor) {
        return tagTypeColor[type];
      }
    }

    const columns: TableColumnType<HandleIncomeItem>[] =
      columnsHandleIncome as TableColumnType<HandleIncomeItem>[];

    const data: any = computed(() => store.getters.getHandleIncomes);

    const onChange: TableProps<HandleIncomeItem>["onChange"] = (
      pagination,
      filters,
      sorter,
    ) => {
      console.log("params", pagination, filters, sorter);
    };

    function calculateTotal(values: any) {
      let total = 0;
      for (const item of values) {
        total += item.amount;
      }
      return total;
    }

    const desiredOrder = [
      "necessity",
      "freedom",
      "education",
      "enjoy",
      "giving",
      "longTermSaving",
    ];

    const reorderData = (data: any, order: any) => {
      const orderMap = order.reduce((acc: any, key: any, index: any) => {
        acc[key] = index;
        return acc;
      }, {});

      return data.sort((a: any, b: any) => orderMap[a.key] - orderMap[b.key]);
    };

    const reorderedData = computed(() => reorderData(data.value, desiredOrder));

    async function onCheckboxChange(event: Event, record: any) {
      const target = event.target as HTMLInputElement | null;
      if (!target) return;

      const isSolved = target.checked;
      record.isSolved = isSolved;

      const handleIncome = data.value.find(
        (item: any) => item.id === record.type,
      );
      if (handleIncome) {
        const item = handleIncome.items.find(
          (item: any) => item.key === record.key,
        );
        if (item) {
          item.isSolved = isSolved;
          await setHandleIncomes(handleIncome.items);
        }
      }
    }

    return {
      funds,
      tagColor,
      columns,
      data,
      onChange,
      isEditable,
      calculateTotal,
      isDarkMode,
      reorderedData,
      onCheckboxChange, // Thêm phương thức vào return
    };
  },
};
</script>
<style scoped></style>
