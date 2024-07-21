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
  localStorage.setItem(
    "currentChooseMonth",
    JSON.stringify({ year, monthYear }),
  );
}

export function getCurrentChooseMonth() {
  const currentChooseMonth = JSON.parse(
    localStorage.getItem("currentChooseMonth"),
  );
  return {
    year: currentChooseMonth.year,
    monthYear: currentChooseMonth.monthYear,
  };
}
