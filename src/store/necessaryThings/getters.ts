import { State } from "@/store/state";
import { roundDecimals } from "@/utils/number.util";
import type { NecessaryThingsItem, NecessaryThingsType } from "@/types/types";

export const getters = {
  getNecessaryThings(state: State): NecessaryThingsItem[] {
    return state.necessaryThings;
  },
  getTotalMonthNecessaryThings(state: State): string {
    let totalPerMonth = 0;
    for(const item of state.necessaryThings) {
      totalPerMonth += item.savePerMonth;
    }
    const result = roundDecimals(totalPerMonth);
    return result;
  },
  getNecessaryThingsType(state: State): NecessaryThingsType[] {
    return state.necessaryThingsType;
  }
};
