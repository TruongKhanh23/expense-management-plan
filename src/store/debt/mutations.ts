import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { v1 as uuidv1 } from "uuid";
import { State } from "@/store/state";

type DebtItem = {
  key: string;
  name: string;
  amount: number;
  startDate: string | Dayjs;
  isFinished: string;
};

export const mutations = {
  addDebt(state: State) {
    const currentDate = dayjs();

    const newDebt = {
      key: uuidv1(),
      name: "",
      amount: 0,
      startDate: currentDate,
      isFinished: "false",
    };
    state.debts.push(newDebt);
  },
  setDebts(state: State, { debts }) {
    state.debts = debts;
  },
};
