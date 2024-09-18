export const actions = {
  setIsFundsEditable(context: { commit: Function }, isFundsEditable) {
    context.commit("setIsFundsEditable", { isFundsEditable });
  },
};
