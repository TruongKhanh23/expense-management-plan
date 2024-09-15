import { actions as count } from "@/store/count/actions";
import { actions as debt } from "@/store/debt/actions";
import { actions as handleIncomes } from "@/store/handleIncomes/actions";
import { actions as incomes } from "@/store/incomes/actions";

export const actions = {
  ...count,
  ...debt,
  ...handleIncomes,
  ...incomes,
};
