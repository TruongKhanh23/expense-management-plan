export function getCurrentTime() {
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonthYear = `${currentMonth}-${currentYear}`;

  return {
    year: currentYear,
    month: currentMonth,
    monthYear: currentMonthYear,
  };
}
