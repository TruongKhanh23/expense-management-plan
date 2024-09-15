import type { HandleIncomeType, HandleIncomeItem } from "@/types/types";
import type { DebtItem } from "@/types/types";
import type { DataIncomeType } from "@/types/types";

export interface State {
  count: number;
  debts: DebtItem[];
  handleIncomes: HandleIncomeType[];
  allHandleIncomesIsDebt: HandleIncomeItem[];
  incomes: DataIncomeType[];
}

export const state: State = {
  count: 0,
  debts: [],
  handleIncomes: [],
  allHandleIncomesIsDebt: [],
  incomes: [],
};
