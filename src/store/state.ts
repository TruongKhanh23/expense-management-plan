import type { Dayjs } from "dayjs";

type DebtItem = {
  key: string;
  name: string;
  amount: number;
  startDate: string | Dayjs;
  isFinished: string;
};
export interface State {
  count: number;
  debt: DebtItem[];
}

export const state: State = {
  count: 0,
  debt: [],
};
