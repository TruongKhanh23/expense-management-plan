export const actions = {
  setEstimateNecessities(context: { commit: Function }, estimateNecessities) {
    context.commit("setEstimateNecessities", { estimateNecessities });
  },
};
