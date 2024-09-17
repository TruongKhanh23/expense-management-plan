import { State } from "@/store/state";

export const mutations = {
  setCurrentChooseMonth(state: State, currentChooseMonth) {
    state.currentChooseMonth = currentChooseMonth;
  },
};
