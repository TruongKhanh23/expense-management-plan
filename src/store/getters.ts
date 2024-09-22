import { State } from "@/store/state";
import { getters as debt } from "@/store/debt/getters";
import { getters as handleIncomes } from "@/store/handleIncomes/getters";
import { getters as incomes } from "@/store/incomes/getters";
import { getters as estimateNecessities } from "@/store/estimateNecessities/getters";
import { getters as funds } from "@/store/funds/getters";
import { getters as currentChooseMonth } from "@/store/currentChooseMonth/getters";
import { getters as booleanFields } from "@/store/booleanFields/getters";
import { getters as user } from "@/store/user/getters";
import { getters as permissions } from "@/store/permissions/getters";
import { getters as necessaryThings } from "@/store/necessaryThings/getters";

export const getters = {
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
  getIsOpenCreateNewMonthModal(state: State): boolean {
    return state.isOpenCreateNewMonthModal;
  },
};
