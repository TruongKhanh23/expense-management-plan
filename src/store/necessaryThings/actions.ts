export const actions = {
  setNecessaryThings(context: { commit: Function }, necessaryThings) {
    context.commit("setNecessaryThings", { necessaryThings });
  },
  removeNecessaryThing(context: { commit: Function }, id) {
    context.commit("removeNecessaryThing", { id });
  },
  addNecessaryThing(context: { commit: Function }) {
    context.commit("addNecessaryThing");
  },  
};
