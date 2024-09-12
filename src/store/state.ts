import type { Dayjs } from "dayjs";
import type { HandleIncomeItem } from '@/types/types'

type DebtItem = {
  key: string;
  name: string;
  amount: number;
  startDate: string | Dayjs;
  isFinished: string;
};
export interface State {
  count: number;
  debts: DebtItem[];
  handleIncomes: HandleIncomeItem[];
}

export const state: State = {
  count: 0,
  debts: [],
  handleIncomes: [],
};
