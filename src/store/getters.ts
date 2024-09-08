import { State } from "@/store/state";

export const getters = {
  getCount(state: State): number {
    return state.count;
  },
};
