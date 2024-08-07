type DataIncomeType = {
  key: string;
  source: string;
  amount: number;
};

export function calculateTotalIncome(data: DataIncomeType[]) {
  if (!Array.isArray(data)) {
    return 0;
  }

  let totalAmount = 0;

  for (const element of data) {
    totalAmount += Number(element.amount);
  }

  return totalAmount;
}

export function roundDecimals(value: number): string {
  if (isNaN(value)) return "0";
  const result = Math.round(value);
  return new Intl.NumberFormat().format(result);
}


