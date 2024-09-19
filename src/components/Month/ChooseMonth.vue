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
import { useStore } from "vuex";
import { DatePicker } from "ant-design-vue";
import { ref, watch, computed } from "vue";

import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import ConfigProvider from "@/components/reusable/ConfigProvider.vue";

import { getCurrentTime, setCurrentChooseMonth } from "@/utils/time.util";

export default {
  components: {
    ADatePicker: DatePicker,
    ConfigProvider,
  },
  props: {
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
  },
  setup(props) {
    const store = useStore();
    const isDarkMode = props.isDark;
    const currentChooseMonth = computed(
      () => store.getters.getCurrentChooseMonth,
    );

    const monthFormat = "MM-YYYY";
    const { currentMonthYear } = getCurrentTime();

    const month = ref<string | Dayjs>(dayjs(currentMonthYear, monthFormat));

    watch(currentChooseMonth, () => {
      const newMonth = ref<string | Dayjs>(
        dayjs(currentChooseMonth.value.monthYear, monthFormat),
      );
      month.value = newMonth.value;
    });

    const handleChange = (value: string | Dayjs, dateString: string) => {
      month.value = value;
      const monthYear = dateString;
      const year = dateString.substring(dateString.length - 4);
      setCurrentChooseMonth(year, monthYear);
    };
    return { month, handleChange, monthFormat, isDarkMode };
  },
};
</script>
