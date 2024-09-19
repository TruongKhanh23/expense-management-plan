import { State } from "@/store/state";

export const getters = {
  getIsFundsEditable(state: State): boolean {
    return state.isFundsEditable;
  },
  getIsVisibleLimitation(state: State): boolean {
    return state.isVisibleLimitation;
  },
  getIsDark(state: State): boolean {
    return state.isDark;
  },
};
