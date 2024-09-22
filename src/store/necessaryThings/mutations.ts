import { v1 as uuidv1 } from "uuid";
import { State } from "@/store/state";

export const mutations = {
  setNecessaryThings(state: State, { necessaryThings }) {
    state.necessaryThings = necessaryThings;
  },
  addNecessaryThing(state: State) {
    const newNecessaryThing = {
      id: uuidv1(),
      name: "",
      timespan: 0,
      savePerMonth: 0,
      limitation: 0,
      type: "Please choose type",
    };
    state.necessaryThings.push(newNecessaryThing);
  },  
  removeNecessaryThing(state: State, { id }) {
    const currentNecessaryThings = state.necessaryThings;
    const indexToRemove = currentNecessaryThings.findIndex(item => item.id === id);
  
    if (indexToRemove !== -1) {
      currentNecessaryThings.splice(indexToRemove, 1);
    }
  
    state.necessaryThings = currentNecessaryThings;
  },  
};
