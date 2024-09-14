import type { HandleIncomeItem } from "@/types/types";
import type { DebtItem } from "@/types/types";

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
