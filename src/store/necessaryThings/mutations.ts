import { State } from "@/store/state";

export const mutations = {
  setNecessaryThings(state: State, { necessaryThings }) {
    state.necessaryThings = necessaryThings;
  },
};
