import { State } from "@/store/state";
import type { Permission } from "@/types/types";

export const getters = {
  getPermissions(state: State): Permission[] {
    return state.permissions;
  }
};
