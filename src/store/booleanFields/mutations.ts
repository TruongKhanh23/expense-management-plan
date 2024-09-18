import { State } from "@/store/state";

export const mutations = {
  setIsFundsEditable(state: State, { isFundsEditable }) {
    state.isFundsEditable = isFundsEditable;
  },
};
