export const actions = {
  setNecessaryThings(context: { commit: Function }, necessaryThings) {
    context.commit("setNecessaryThings", { necessaryThings });
  },
};
