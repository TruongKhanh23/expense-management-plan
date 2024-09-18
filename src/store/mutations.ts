import { State } from "@/store/state";
import { mutations as debt } from "@/store/debt/mutations";
import { mutations as handleIncomes } from "@/store/handleIncomes/mutations";
import { mutations as incomes } from "@/store/incomes/mutations";
import { mutations as estimateNecessities } from "@/store/estimateNecessities/mutations";
import { mutations as funds } from "@/store/funds/mutations";
import { mutations as currentChooseMonth } from "@/store/currentChooseMonth/mutations";

export const mutations = {
  ...debt,
  ...handleIncomes,
  ...incomes,
  ...estimateNecessities,
  ...funds,
  ...currentChooseMonth,
  setIsOpenCreateNewMonthModal(state: State, { isOpenCreateNewMonthModal }) {
    state.isOpenCreateNewMonthModal = isOpenCreateNewMonthModal;
  },
};
