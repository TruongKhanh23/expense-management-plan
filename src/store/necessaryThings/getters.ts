import { State } from "@/store/state";
import type { NecessaryThingsItem, NecessaryThingsType } from "@/types/types";

export const getters = {
  getNecessaryThings(state: State): NecessaryThingsItem[] {
    return state.necessaryThings;
  },
  getNecessaryThingsType(state: State): NecessaryThingsType[] {
    return state.necessaryThingsType;
  }
};
