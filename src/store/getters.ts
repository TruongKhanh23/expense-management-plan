import { getters as debt } from "@/store/debt/getters";
import { getters as handleIncomes } from "@/store/handleIncomes/getters";
import { getters as incomes } from "@/store/incomes/getters";

export const getters = {
  ...debt,
  ...handleIncomes,
  ...incomes,
};
