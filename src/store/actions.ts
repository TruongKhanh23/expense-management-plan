import { actions as debt } from "@/store/debt/actions";
import { actions as handleIncomes } from "@/store/handleIncomes/actions";
import { actions as incomes } from "@/store/incomes/actions";
import { actions as estimateNecessities } from "@/store/estimateNecessities/actions";
import { actions as funds } from "@/store/funds/actions";
import { actions as currentChooseMonth } from "@/store/currentChooseMonth/actions";
import { actions as booleanFields } from "@/store/booleanFields/actions";

export const actions = {
  ...debt,
  ...handleIncomes,
  ...incomes,
  ...estimateNecessities,
  ...funds,
  ...currentChooseMonth,
  ...booleanFields,
  setIsOpenCreateNewMonthModal(
    context: { commit: Function },
    isOpenCreateNewMonthModal,
  ) {
    context.commit("setIsOpenCreateNewMonthModal", {
      isOpenCreateNewMonthModal,
    });
  },
};
