import { State } from "@/store/state";

export const mutations = {
  setIsFundsEditable(state: State, { isFundsEditable }) {
    state.isFundsEditable = isFundsEditable;
  },
  setIsVisibleLimitation(state: State, { isVisibleLimitation }) {
    state.isVisibleLimitation = isVisibleLimitation;
  },
  setIsDark(state: State, { isDark }) {
    state.isDark = isDark;
  },
};
