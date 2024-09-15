export const actions = {
  setIncomes(context: { commit: Function }, incomes) {
    context.commit("setIncomes", { incomes });
  },
  removeIncome(context: { commit: Function }, key) {
    context.commit("removeIncome", { key });
  },
};
