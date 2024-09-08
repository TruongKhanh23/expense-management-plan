// store.ts
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import { mutations } from "@/store/mutations"; // Import mutations từ file store/mutations.ts
import { actions } from "@/store/actions"; // Import actions từ file store/actions.ts
import { getCount } from "@/store/count/getters";
import { state, State } from "@/store/state";

const { createStore } = Vuex;

const vuexPersist = new VuexPersist({
  key: "expense-management-plan",
  storage: localStorage,
});

const store = createStore<State>({
  state,
  mutations,
  actions,
  getters: {
    getCount,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
