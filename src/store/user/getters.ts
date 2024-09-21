import { State } from "@/store/state";

export const getters = {
  getUser(state: State): object {
    return state.user;
  },
};
