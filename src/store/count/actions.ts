// actions.ts
import { State } from "@/store"; // Import interface State

interface ActionContextCustom {
  commit: (mutation: string) => void;
  state: State;
}

export function increment({ commit }: ActionContextCustom) {
  commit("increment");
}
