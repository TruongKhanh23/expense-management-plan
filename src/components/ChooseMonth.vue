<template>
  <div class="flex flex-row gap-2 justify-center">
    <ConfigProvider :isDark="isDarkMode">
      <a-date-picker
        :format="monthFormat"
        v-model:value="value3"
        picker="month"
        @change="handleChange"
      />
    </ConfigProvider>
  </div>
</template>
<script lang="ts">
import { DatePicker } from "ant-design-vue";
import { ref } from "vue";

import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import ConfigProvider from "@/components/reusable/ConfigProvider.vue";

import { getCurrentTime } from "@/utils/time.util";

export default {
  components: {
    ADatePicker: DatePicker,
    ConfigProvider,
  },
  emits: ["action:updateMonth"],
  props: {
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
  },
  setup(props, { emit }) {
    const isDarkMode = props.isDark;
    const monthFormat = "MM-YYYY";
    const { monthYear } = getCurrentTime();
    const value3 = ref<string | Dayjs>(dayjs(monthYear, monthFormat));
    const handleChange = (value: string | Dayjs, dateString: string) => {
      value3.value = value;
      const monthYear = dateString;
      const year = dateString.substring(dateString.length - 4);
      emit("action:updateMonth", year, monthYear);
    };
    return { value3, handleChange, monthFormat, isDarkMode };
  },
};
</script>
