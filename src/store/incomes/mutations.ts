import { v1 as uuidv1 } from "uuid";
import { State } from "@/store/state";

export const mutations = {
  addIncome(state: State) {
    const newIncome = {
      key: uuidv1(),
      source: "",
      amount: 0,
    };
    state.incomes.push(newIncome);
  },
  setIncomes(state: State, { incomes }) {
    state.incomes = incomes;
  },
  removeIncome(state: State, { key }) {
    const currentIncomes = state.incomes;
    const indexToRemove = currentIncomes.findIndex((item) => item.key === key);

    if (indexToRemove !== -1) {
      currentIncomes.splice(indexToRemove, 1);
    }

    state.incomes = currentIncomes;
  },
};
