// store/actions.ts
import { actions as countActions } from "@/store/count/actions"; // Import các action của count

export const actions = {
  ...countActions, // Gộp các action từ countActions
};
