import { State } from "@/store/state";

export const mutations = {
  setFunds(state: State, { funds }) {
    state.funds = funds;
  },
};
