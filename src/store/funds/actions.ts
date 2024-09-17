export const actions = {
  setFunds(context: { commit: Function }, funds) {
    context.commit("setFunds", { funds });
  },
};
