export const actions = {
  setHandleIncomes(context: { commit: Function }, handleIncomes) {
    context.commit("setHandleIncomes", { handleIncomes });
  },
  setAllHandleIncomesIsDebt(
    context: { commit: Function },
    allHandleIncomesIsDebt,
  ) {
    context.commit("setAllHandleIncomesIsDebt", { allHandleIncomesIsDebt });
  },
  removeHandleIncome(context: { commit: Function }, key) {
    context.commit("removeHandleIncome", { key });
  },
};
