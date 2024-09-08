import { State } from "@/store/state";

export function getCount(state: State): number {
  return state.count;
}
