import { State } from "@/store/state";

export const mutations = {
  setUser(state: State, { user }) {
    state.user = user;
  },
};
