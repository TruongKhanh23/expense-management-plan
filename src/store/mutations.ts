import { State } from "@/store/state";
import { mutations as debt } from "@/store/debt/mutations";
import { mutations as handleIncomes } from "@/store/handleIncomes/mutations";
import { mutations as incomes } from "@/store/incomes/mutations";
import { mutations as estimateNecessities } from "@/store/estimateNecessities/mutations";
import { mutations as funds } from "@/store/funds/mutations";
import { mutations as currentChooseMonth } from "@/store/currentChooseMonth/mutations";
import { mutations as booleanFields } from "@/store/booleanFields/mutations";
import { mutations as user } from "@/store/user/mutations";
import { mutations as permissions } from "@/store/permissions/mutations";
import { mutations as necessaryThings } from "@/store/necessaryThings/mutations";

export const mutations = {
  ...debt,
  ...handleIncomes,
  ...incomes,
  ...estimateNecessities,
  ...funds,
  ...currentChooseMonth,
  ...booleanFields,
  ...user,
  ...permissions,
  ...necessaryThings,
  setIsOpenCreateNewMonthModal(state: State, { isOpenCreateNewMonthModal }) {
    state.isOpenCreateNewMonthModal = isOpenCreateNewMonthModal;
  },
};
