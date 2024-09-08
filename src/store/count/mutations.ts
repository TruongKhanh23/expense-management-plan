// mutations.ts
import { State } from "@/store"; // Đảm bảo import đúng interface State

export function increment(state: State) {
  state.count++;
}
