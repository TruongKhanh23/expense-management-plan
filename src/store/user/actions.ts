export const actions = {
  setUser(context: { commit: Function }, user) {
    context.commit("setUser", { user });
  },
};
