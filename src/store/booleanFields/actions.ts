export const actions = {
  setIsFundsEditable(context: { commit: Function }, isFundsEditable) {
    context.commit("setIsFundsEditable", { isFundsEditable });
  },
  setIsVisibleLimitation(context: { commit: Function }, isVisibleLimitation) {
    context.commit("setIsVisibleLimitation", { isVisibleLimitation });
  },
};
