<template>
  <div class="flex flex-row gap-2 justify-center">
    <ConfigProvider :isDark="isDarkMode">
      <a-date-picker
        :format="monthFormat"
        v-model:value="month"
        picker="month"
        @change="handleChange"
      />
    </ConfigProvider>
  </div>
</template>
<script lang="ts">
import { DatePicker } from "ant-design-vue";
import { ref, watch } from "vue";

import type { Dayjs } from 'dayjs';
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
    newMonthCreated: {
      type: [String],
      require: undefined,
    },
  },
  setup(props, { emit }) {
    const isDarkMode = props.isDark;
    const monthFormat = "MM-YYYY";
    const { currentMonthYear } = getCurrentTime();
    
    const month = ref<string | Dayjs>(dayjs(currentMonthYear, monthFormat));

    watch(props, async () => {
      const newMonth = ref<string | Dayjs>(dayjs(props.newMonthCreated, monthFormat))
      month.value = newMonth.value
    })

    const handleChange = (value: string | Dayjs, dateString: string) => {
      month.value = value;
      const monthYear = dateString;
      const year = dateString.substring(dateString.length - 4);
      emit("action:updateMonth", year, monthYear);
    };
    return { month, handleChange, monthFormat, isDarkMode };
  },
};
</script>