import { actions as countActions } from "@/store/count/actions";
import { actions as debtActions } from "@/store/debt/actions";

export const actions = {
  ...countActions,
  ...debtActions,
};
