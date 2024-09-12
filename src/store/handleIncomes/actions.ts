export const actions = {
  addHandleIncome(context: { commit: Function }) {
    context.commit("addHandleIncome");
  },
  setHandleIncomes(context: { commit: Function }, handleIncomes) {
    context.commit("setHandleIncomes", { handleIncomes });
  },
  removeHandleIncome(context: { commit: Function }, key) {
    context.commit("removeHandleIncome", { key });
  },
};
