import { mutations as countMutations } from "@/store/count/mutations";
import { mutations as debtMutations } from "@/store/debt/mutations";
import { mutations as handleIncomesMutations } from "@/store/handleIncomes/mutations";

export const mutations = {
  ...countMutations,
  ...debtMutations,
  ...handleIncomesMutations,
};
