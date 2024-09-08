import { State } from "@/store/state";

export function increment(state: State) {
  state.count++;
}
export function decrement(state: State) {
  state.count--;
}
