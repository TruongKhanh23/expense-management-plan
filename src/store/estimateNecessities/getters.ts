import { State } from "@/store/state";
import type { EstimateNecessityType } from "@/types/types";

export const getters = {
  getEstimateNecessities(state: State): EstimateNecessityType[] {
    return state.estimateNecessities;
  },
};
