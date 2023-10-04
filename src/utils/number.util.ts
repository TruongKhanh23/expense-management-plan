type DataIncomeType = {
  key: string;
  source: string;
  amount: number;
};

export function calculateTotalIncome(data: DataIncomeType[]) {
  console.log("data calculateTotalIncome", data);

  if (!Array.isArray(data)) {
    return 0;
  }

  let totalAmount = 0;

  for (const element of data) {
    totalAmount += Number(element.amount);
    console.log("totalAmount", totalAmount);
  }

  return totalAmount;
}
