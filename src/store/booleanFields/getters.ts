import { State } from "@/store/state";

export const getters = {
  getIsFundsEditable(state: State): boolean {
    return state.isFundsEditable;
  },
};
