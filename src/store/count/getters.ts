// getters.ts
import { State } from "@/store"; // Đảm bảo import đúng interface State

export function getCount(state: State): number {
  return state.count;
}
