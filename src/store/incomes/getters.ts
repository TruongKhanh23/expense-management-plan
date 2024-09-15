import { State } from "@/store/state";
import { calculateTotalIncome } from "@/utils/number.util";
import type { DataIncomeType } from "@/types/types";

export const getters = {
  getIncomes(state: State): DataIncomeType[] {
    return state.incomes;
  },
  getTotalIncome(state: State): number {
    const totalIncome = calculateTotalIncome(state.incomes) ?? 0;
    return totalIncome;
  },
};
