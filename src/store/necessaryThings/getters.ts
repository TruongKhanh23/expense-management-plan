import { State } from "@/store/state";
import type { NecessaryThingsItem } from "@/types/types";

export const getters = {
  getNecessaryThings(state: State): NecessaryThingsItem[] {
    return state.necessaryThings;
  }
};
