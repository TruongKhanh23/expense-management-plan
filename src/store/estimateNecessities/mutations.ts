import { State } from "@/store/state";

export const mutations = {
  setEstimateNecessities(state: State, { estimateNecessities }) {
    state.estimateNecessities = estimateNecessities;
  },
};
