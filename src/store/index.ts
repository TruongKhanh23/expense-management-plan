import Vuex from "vuex";
import VuexPersist from "vuex-persist";
export interface State {
  count: number;
}

const { createStore } = Vuex;

const vuexPersist = new VuexPersist({
  key: "expense-management-plan", // Tên khóa trong localStorage
  storage: localStorage,
});

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
    increment({ commit }) {
      commit("increment");
    },
  },
  getters: {
    getCount(state) {
      return state.count;
    },
  },
  plugins: [vuexPersist.plugin], // Thêm plugin vào Vuex
});

export default store;
