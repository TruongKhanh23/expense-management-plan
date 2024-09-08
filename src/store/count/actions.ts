import { State } from "@/store/state";

interface ActionContextCustom {
  commit: (mutation: string) => void;
  state: State;
}

export function increment({ commit }: ActionContextCustom) {
  commit("increment");
}
export function decrement({ commit }: ActionContextCustom) {
  commit("decrement");
}
