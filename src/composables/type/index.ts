export type HandleIncomeType = {
  id: string;
  type: string;
  items: HandleIncomeItem[];
};

export type HandleIncomeItem = {
  key: string;
  wallet: string;
  type: string;
  fund: string;
  amount: number;
};
