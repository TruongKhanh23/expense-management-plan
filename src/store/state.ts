import type { HandleIncomeType, HandleIncomeItem } from "@/types/types";
import type { DebtItem } from "@/types/types";

export interface State {
  count: number;
  debts: DebtItem[];
  handleIncomes: HandleIncomeType[];
  allHandleIncomesIsDebt: HandleIncomeItem[];
}

export const state: State = {
  count: 0,
  debts: [],
  handleIncomes: [],
  allHandleIncomesIsDebt: [],
};
