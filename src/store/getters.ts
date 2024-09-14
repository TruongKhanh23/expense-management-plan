import { getters as countGetters } from "@/store/count/getters";
import { getters as debtGetters } from "@/store/debt/getters";
import { getters as handleIncomesGetters } from "@/store/handleIncomes/getters";

export const getters = {
  ...countGetters,
  ...debtGetters,
  ...handleIncomesGetters,
};
