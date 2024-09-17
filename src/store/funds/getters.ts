import { State } from "@/store/state";
import type { FundItem } from "@/types/types";

export const getters = {
  getFunds(state: State): FundItem[] {
    return state.funds;
  }
};
