import Vuex from "vuex";
export interface State {
  count: number;
}

const { createStore } = Vuex;

const store = createStore<State>({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
  getters: {
    getCount(state): number {
      return state.count;
    },
  },
});

export default store;
