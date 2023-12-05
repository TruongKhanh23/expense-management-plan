<template>
  <div class="px-4">
    <Slider
      :list="data"
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
            :row-selection="{
              selectedRowKeys: state.selectedRowKeys,
              onChange: onSelectChange,
            }"
            :key="index"
            @change="onChange"
            :pagination="{ hideOnSinglePage: true }"
          >
            <template #bodyCell="{ column, record }">
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
          <HandleIncomeEdit v-else :data="data.items" />
        </ConfigProvider>
      </template>
    </Slider>
  </div>
</template>
<script lang="ts">
import { ref, computed, reactive, watch } from "vue";
import { Button, Table, Tag, Switch } from "ant-design-vue";
import type { TableColumnType, TableProps } from "ant-design-vue";
import HandleIncomeEdit from "@/components/HandleIncomeEdit.vue";
import Slider from "@/components/reusable/Slider.vue";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";
import { Key } from "ant-design-vue/es/table/interface";
import { HandleIncomeType } from "@/composables/type/index.ts";

type HandleIncomeItem = {
  key: string;
  wallet: string;
  type: string;
  fund: string;
  amount: number;
};

export default {
  components: {
    AButton: Button,
    ATable: Table,
    ATag: Tag,
    ASwitch: Switch,
    HandleIncomeEdit,
    Slider,
    ConfigProvider,
  },
  props: {
    columnsHandleIncome: {
      type: Array as () => TableColumnType<HandleIncomeItem>[],
      default: () => [],
    },
    dataHandleIncome: {
      type: Array as () => HandleIncomeType[],
      default: () => [],
    },
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
  },
  setup(props) {
    const isDarkMode = props.isDark;
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
      props.columnsHandleIncome as TableColumnType<HandleIncomeItem>[];

    const data: any = computed(() => props.dataHandleIncome);

    const itemsCheck = computed(() => {
      const result = [];
      console.log("data.value", data.value);
      
      for (const funds of data.value) {
        console.log("funds", funds.items);

        for (const item of funds.items) {
          if (item.isSolved) {
            result.push(item.key);
          }
        }
      }
      console.log("result", result);

      return result;
    });

    watch(itemsCheck, async () => {
      // Khi props.dataHandleIncome thay đổi, cập nhật giá trị mới cho selectedRowKeys
      state.selectedRowKeys = itemsCheck.value;
    });

    const state = reactive<{
      selectedRowKeys: Key[];
      loading: boolean;
    }>({
      selectedRowKeys: itemsCheck.value, // Check here to configure the default column
      loading: false,
    });
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const start = () => {
      state.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        state.loading = false;
        state.selectedRowKeys = [];
      }, 1000);
    };
    const onSelectChange = (selectedRowKeys: Key[], selectedRows: any[]) => {
      console.log("selectedRows", selectedRows);
      state.selectedRowKeys = selectedRowKeys;
    };
    function calculateTotal(values: any) {
      let total = 0;
      for (const item of values) {
        total += item.amount;
      }

      return total;
    }

    const onChange: TableProps<HandleIncomeItem>["onChange"] = (
      pagination,
      filters,
      sorter,
    ) => {
      console.log("params", pagination, filters, sorter);
    };

    return {
      columns,
      data,
      state,
      hasSelected,
      start,
      onSelectChange,
      calculateTotal,
      tagColor,
      isDarkMode,
      isEditable,
      onChange,
    };
  },
};
</script>
