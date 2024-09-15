import { State } from "@/store/state";

import type { DataIncomeType } from "@/types/types";

export const getters = {
  getIncomes(state: State): DataIncomeType[] {
    return state.incomes;
  },
};
