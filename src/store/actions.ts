import { actions as countActions } from "@/store/count/actions";
import { actions as debtActions } from "@/store/debt/actions";
import { actions as handleIncomesActions } from "@/store/handleIncomes/actions";

export const actions = {
  ...countActions,
  ...debtActions,
  ...handleIncomesActions,
};
