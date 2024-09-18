import { computed } from "vue"
import store from "@/store";

export function getCurrentTime() {
  const currentDate = new Date();
  const currentDateString = currentDate.toString();
  const currentMonth =
    currentDate.getMonth() < 10
      ? "0" + (currentDate.getMonth() + 1).toString()
      : (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonthYear = `${currentMonth}-${currentYear}`;

  return {
    currentYear,
    currentMonth,
    currentMonthYear,
    currentDate: currentDateString,
  };
}

export function setCurrentChooseMonth(year, monthYear) {
  store.dispatch("setCurrentChooseMonth", {
    year,
    monthYear,
  });
}

export function getCurrentChooseMonth() {
  const currentChooseMonth = computed(() => store.getters.getCurrentChooseMonth);
  return {
    year: currentChooseMonth.value.year,
    monthYear: currentChooseMonth.value.monthYear,
  };
}
