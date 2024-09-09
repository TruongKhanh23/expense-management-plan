import { getters as countGetters } from "@/store/count/getters";
import { getters as debtGetters } from "@/store/debt/getters";

export const getters = {
  ...countGetters,
  ...debtGetters,
};
