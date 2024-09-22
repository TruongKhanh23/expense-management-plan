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
  setNecessaryThingsType(context: { commit: Function }, necessaryThingsType) {
    context.commit("setNecessaryThingsType", { necessaryThingsType });
  },
  removeNecessaryThingType(context: { commit: Function }, id) {
    context.commit("removeNecessaryThingType", { id });
  },
  addNecessaryThingType(context: { commit: Function }) {
    context.commit("addNecessaryThingType");
  },
};
