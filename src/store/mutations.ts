import { mutations as count } from "@/store/count/mutations";
import { mutations as debt } from "@/store/debt/mutations";
import { mutations as handleIncomes } from "@/store/handleIncomes/mutations";
import { mutations as incomes } from "@/store/incomes/mutations";
import { mutations as estimateNecessities } from "@/store/estimateNecessities/mutations";

export const mutations = {
  ...count,
  ...debt,
  ...handleIncomes,
  ...incomes,
  ...estimateNecessities,
};
