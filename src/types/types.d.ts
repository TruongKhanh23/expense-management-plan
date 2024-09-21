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

export type FundItem = {
  classColor: string;
  id: string;
  name: string;
  order: number;
  percentage: number;
  src: string;
  wallet: string;
};

export type CurrentChooseMonth = {
  year: string;
  monthYear: string;
};

export type Permission = {
  email: string;
  key: string;
  permission: string;
}

export type NecessaryThingsItem = {
  id: string,
  name: string,
  timespan: number,
  savePerMonth: number,
  limitation: number,
  type: string,
}