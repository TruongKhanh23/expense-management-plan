import type { HandleIncomeType, HandleIncomeItem } from "@/types/types";
import type { DebtItem } from "@/types/types";
import type { DataIncomeType, EstimateNecessityType } from "@/types/types";

export interface State {
  count: number;
  debts: DebtItem[];
  handleIncomes: HandleIncomeType[];
  allHandleIncomesIsDebt: HandleIncomeItem[];
  incomes: DataIncomeType[];
  estimateNecessities: EstimateNecessityType[];
}

export const state: State = {
  count: 0,
  debts: [],
  handleIncomes: [],
  allHandleIncomesIsDebt: [],
  incomes: [],
  estimateNecessities: [],
};
