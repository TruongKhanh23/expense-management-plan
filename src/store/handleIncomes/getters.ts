import { State } from "@/store/state";

import type { HandleIncomeType, HandleIncomeItem } from "@/types/types";

export const getters = {
  getHandleIncomes(state: State): HandleIncomeType[] {
    return state.handleIncomes;
  },
  getAllHandleIncomesIsDebt(state: State): HandleIncomeItem[] {
    return state.allHandleIncomesIsDebt;
  },
};
