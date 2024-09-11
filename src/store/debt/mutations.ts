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
    state.debts.push(newDebt);
  },
  setDebts(state: State, { debts }) {
    state.debts = debts;
  },
  removeDebt(state: State, { key }) {
    const currentDebts = state.debts;
    const indexToRemove = currentDebts.findIndex(item => item.key === key);

    if (indexToRemove !== -1) {
      currentDebts.splice(indexToRemove, 1);
    }

    state.debts = currentDebts;
  },
};
