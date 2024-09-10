export const actions = {
  addDebt(context: { commit: Function }) {
    context.commit("addDebt");
  },
  setDebts(context: { commit: Function }, debts) {
    context.commit("setDebts", { debts });
  },
};
