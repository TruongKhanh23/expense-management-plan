import { State } from "@/store/state";

export const mutations = {
  setPermissions(state: State, { permissions }) {
    state.permissions = permissions;
  },
};
