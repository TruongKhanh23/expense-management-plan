import dayjs from "dayjs";
import { v1 as uuidv1 } from "uuid";
import { State } from "@/store/state";

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
    state.debt.push(newDebt);
  },
};
