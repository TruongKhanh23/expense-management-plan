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
