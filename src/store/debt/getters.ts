import { State } from "@/store/state";

import type { Dayjs } from "dayjs";

type DebtItem = {
  key: string;
  name: string;
  amount: number;
  startDate: string | Dayjs;
  isFinished: string;
};

export const getters = {
  getDebts(state: State): DebtItem[] {
    return state.debts;
  },
};
