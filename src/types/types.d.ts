export type HandleIncomeType = {
  key: string;
  type: string;
  id: string;
  items: HandleIncomeItem[];
};

export type HandleIncomeItem = {
  key: string;
  wallet: string;
  type: string;
  fund: string;
  amount: number;
  debtId: number;
  isDebt: string;
  isSolved: boolean;
};

export type NecessaryThingsItem = {
  id: number;
  name: string;
  timespan: number;
  savePerMonth: number;
  limitation: number;
  type: string;
};

export type DebtItem = {
  key: string;
  name: string;
  amount: number;
  startDate: string | Dayjs;
  isFinished: string;
};

export type EstimateNecessityType = {
  id: string;
  details: EstimateNecessityItem[];
  name: string;
  order: number;
};

export type EstimateNecessityItem = {
  id: string;
  name: string;
  amount: number;
};

export type DataIncomeType = {
  key: string;
  source: string;
  amount: number;
};
