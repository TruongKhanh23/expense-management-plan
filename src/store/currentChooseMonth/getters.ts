import { State } from "@/store/state";
import { CurrentChooseMonth } from "@/types/types";

export const getters = {
  getCurrentChooseMonth(state: State): CurrentChooseMonth {
    return state.currentChooseMonth;
  },
};
