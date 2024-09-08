// store.ts
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import { increment as incrementMutation } from "@/store/count/mutations"; // Import mutation
import { increment as incrementAction } from "@/store/count/actions"; // Import action
import { getCount } from "@/store/count/getters"; // Import getter

export interface State {
  count: number;
}

const { createStore } = Vuex;

const vuexPersist = new VuexPersist({
  key: "expense-management-plan",
  storage: localStorage,
});

const store = createStore<State>({
  state: {
    count: 0,
  },
  mutations: {
    increment: incrementMutation,
  },
  actions: {
    increment: incrementAction,
  },
  getters: {
    getCount,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
