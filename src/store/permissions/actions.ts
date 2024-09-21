export const actions = {
  setPermissions(context: { commit: Function }, permissions) {
    context.commit("setPermissions", { permissions });
  },
};
