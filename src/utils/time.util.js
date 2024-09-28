import store from "@/store";

export function getCurrentTime() {
  const currentDate = new Date();

  // Lấy ngày 26 theo UTC
  let payDay = new Date(
    Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 26),
  );

  // Điều chỉnh ngày trả lương nếu ngày 26 là thứ 7 hoặc Chủ nhật
  const dayOfWeek = payDay.getUTCDay();
  if (dayOfWeek === 6) {
    // Thứ 7
    payDay.setUTCDate(25);
  } else if (dayOfWeek === 0) {
    // Chủ nhật
    payDay.setUTCDate(24);
  }

  // Xác định tháng hiện tại dựa trên ngày trả lương
  let currentMonth = payDay.getUTCMonth() + 2; // Thêm 1 ở đây
  if (currentDate < payDay) {
    currentMonth = currentMonth - 1 === 0 ? 12 : currentMonth - 1;
  }

  const currentMonthString =
    currentMonth < 10 ? "0" + currentMonth : currentMonth.toString();
  const currentYear = currentDate.getUTCFullYear().toString();
  const currentMonthYear = `${currentMonthString}-${currentYear}`;
  const currentDateString = currentDate.toString();

  return {
    currentYear,
    currentMonth: currentMonthString,
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
  const currentChooseMonth = store.getters.getCurrentChooseMonth;
  return {
    year: currentChooseMonth.year,
    monthYear: currentChooseMonth.monthYear,
  };
}
