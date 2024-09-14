import { State } from "@/store/state";
import type { DebtItem } from "@/types/types";

export const getters = {
  getDebts(state: State): DebtItem[] {
    return state.debts;
  },
};
