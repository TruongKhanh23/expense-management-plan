// store.ts
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import { increment as countIncrementMutation } from "@/store/count/mutations";
import { increment as countIncrementAction } from "@/store/count/actions";
import { decrement as countDecrementMutation } from "@/store/count/mutations";
import { decrement as countDecrementAction } from "@/store/count/actions";
import { getCount } from "@/store/count/getters";
import { state, State } from "@/store/state";

const { createStore } = Vuex;

const vuexPersist = new VuexPersist({
  key: "expense-management-plan",
  storage: localStorage,
});

const store = createStore<State>({
  state,
  mutations: {
    increment: countIncrementMutation,
    decrement: countDecrementMutation,
  },
  actions: {
    increment: countIncrementAction,
    decrement: countDecrementAction,
  },
  getters: {
    getCount,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
