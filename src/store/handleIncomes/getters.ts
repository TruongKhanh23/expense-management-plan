import { State } from "@/store/state";

import type { HandleIncomeItem } from "@/types/types";

export const getters = {
  getHandleIncomes(state: State): HandleIncomeItem[] {
    return state.handleIncomes;
  },
  getAllHandleIncomesIsDebt(state: State): HandleIncomeItem[] {
    return state.allHandleIncomesIsDebt;
  },
};
