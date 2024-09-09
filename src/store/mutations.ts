import { mutations as countMutations } from "@/store/count/mutations";
import { mutations as debtMutations } from "@/store/debt/mutations";

export const mutations = {
  ...countMutations,
  ...debtMutations,
};
