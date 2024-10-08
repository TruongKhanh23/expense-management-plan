<template>
  <!-- Input for combined search by name and type -->
  <ConfigProvider :isDark="isDarkMode">
    <p class="font-bold mr-2 mb-2">
      Tổng mỗi tháng:
      {{ totalNecessaryThingsPerMonth }}
      đồng
    </p>
    <div class="flex items-center justify-between mb-2 gap-4">
      <div :class="isMobile ? 'w-full' : 'w-[250px]'">
        <a-input
          v-if="!isEditable"
          v-model:value="searchQuery"
          placeholder="Search by name or type"
          style="display: flex; align-items: center; height: 40px"
        >
          <template #prefix>
            <SearchOutlined style="padding-right: 5px" />
          </template>
        </a-input>
      </div>
      <div v-if="!isMobile" class="flex flex-row my-2">
        <p class="font-bold mr-2 hidden md:flex">Chỉnh sửa:</p>
        <a-switch class="my-ant-switch" v-model:checked="isEditable" />
      </div>
    </div>
    <div class="flex flex-row gap-2">
      <div class="hidden md:flex">
        <NecessaryThingsType :class="necessaryThingsClass" />
        <NecessaryThingsTypeEdit
          :class="necessaryThingsEditClass"
          class="mr-10"
        />
      </div>
      <a-table
        :columns="columns"
        :data-source="filteredData"
        :pagination="{ hideOnSinglePage: true }"
        :class="necessaryThingsClass"
        class="min-h-screen"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            <p>{{ record.name }}</p>
            <a-tag :color="tagColor(record.type)" class="text-center md:hidden">
              {{ record.type }}
            </a-tag>
          </template>
          <template v-if="column.dataIndex === 'type' && !isMobile">
            <a-tag :color="tagColor(record.type)" class="text-center">
              {{ record.type }}
            </a-tag>
          </template>
          <template v-if="column.dataIndex === 'timespan'">
            <p>
              <span class="font-bold">{{
                roundDecimals(record.timespan, 2)
              }}</span>
            </p>
          </template>
          <template v-if="column.dataIndex === 'savePerMonth'">
            <p>
              {{
                new Intl.NumberFormat().format(
                  roundDecimals(record.savePerMonth, 0),
                )
              }}
            </p>
          </template>
          <template v-if="column.dataIndex === 'limitation'">
            <p>{{ new Intl.NumberFormat().format(record.limitation) }}</p>
          </template>
        </template>
      </a-table>
      <NecessaryThingsEdit :class="necessaryThingsEditClass" />
    </div>
  </ConfigProvider>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Col, Table, Tag, Switch, Input } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import type { TableColumnType } from "ant-design-vue";
import type { NecessaryThingsItem } from "@/types/types";
import {
  columnsNecessaryThings,
  columnsNecessaryThingsMobile,
} from "@/assets/data/sample";
import ConfigProvider from "@/components/reusable/ConfigProvider.vue";
import NecessaryThingsEdit from "@/components/necessity/NecessaryThingsEdit.vue";
import NecessaryThingsType from "@/components/necessity/NecessaryThingsType.vue";
import NecessaryThingsTypeEdit from "@/components/necessity/NecessaryThingsTypeEdit.vue";
import detectDevice from "@/utils/device.util";

export default {
  components: {
    ATag: Tag,
    ATable: Table,
    ACol: Col,
    ASwitch: Switch,
    AInput: Input,
    ConfigProvider,
    NecessaryThingsEdit,
    NecessaryThingsType,
    NecessaryThingsTypeEdit,
    SearchOutlined,
  },
  setup() {
    const store = useStore();
    const { isMobile } = detectDevice();

    // State for search input
    const searchQuery = ref("");
    4;
    const totalNecessaryThingsPerMonth = computed(
      () => store.getters.getTotalMonthNecessaryThings,
    );
    const necessaryThingsClass = computed(() =>
      isEditable.value ? "hidden" : "",
    );
    const necessaryThingsEditClass = computed(() =>
      isEditable.value ? "" : "hidden",
    );

    const isEditable = ref(false);
    const isDarkMode = computed(() => store.getters.getIsDark);
    const tagTypeColor: Record<string, string> = {
      shampoo: "pink",
      skinCare: "blue",
      oralHealth: "green",
      bodyCare: "purple",
      furniture: "default",
    };

    function tagColor(type: string) {
      if (type in tagTypeColor) {
        return tagTypeColor[type];
      }
    }

    const columns: TableColumnType<NecessaryThingsItem>[] = isMobile
      ? columnsNecessaryThingsMobile
      : (columnsNecessaryThings as TableColumnType<NecessaryThingsItem>[]);

    const data = computed(() => store.getters.getNecessaryThings);

    // Computed property for filtered data
    const filteredData = computed(() => {
      if (!searchQuery.value) {
        return data.value;
      }
      return data.value.filter((item: NecessaryThingsItem) => {
        const nameMatch = item.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
        const typeMatch = item.type
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
        return nameMatch || typeMatch;
      });
    });

    function roundDecimals(value: number, decimals: number): number {
      if (isNaN(value)) return 0;
      return parseFloat(value.toFixed(decimals));
    }

    return {
      isMobile,
      isEditable,
      isDarkMode,
      data,
      filteredData,
      columns,
      roundDecimals,
      tagColor,
      searchQuery,
      necessaryThingsClass,
      necessaryThingsEditClass,
      totalNecessaryThingsPerMonth,
    };
  },
};
</script>
