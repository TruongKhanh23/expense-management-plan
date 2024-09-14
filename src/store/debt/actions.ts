export const actions = {
  addDebt(context: { commit: Function }) {
    context.commit("addDebt");
  },
  setDebts(context: { commit: Function }, debts) {
    context.commit("setDebts", { debts });
  },
  removeDebt(context: { commit: Function }, key) {
    context.commit("removeDebt", { key });
  },
};
