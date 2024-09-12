import { v1 as uuidv1 } from "uuid";
import { State } from "@/store/state";
import type { HandleIncomeItem } from '@/types/types'; // Import HandleIncomeItem

export const mutations = {
  addHandleIncome(state: State, { type, debtId }) {
    const newHandleIncome: HandleIncomeItem = {
        key: uuidv1(),
        wallet: "",
        type: type,
        fund: "",
        amount: 0,
        isRepay: "string",
        debtId: debtId,
        isDebt: "false",
        isSolved: false,
      };
    state.handleIncomes.push(newHandleIncome); // Thay đổi từ 'debts' thành 'handleIncomes'
  },
  setHandleIncomes(state: State, { handleIncomes }: { handleIncomes: HandleIncomeItem[] }) {
    state.handleIncomes = handleIncomes; // Thay đổi từ 'debts' thành 'handleIncomes'
  },
  removeHandleIncome(state: State, { id }: { id: string }) {
    const currentHandleIncomes = state.handleIncomes; // Thay đổi từ 'debts' thành 'handleIncomes'
    const indexToRemove = currentHandleIncomes.findIndex(item => item.key === id); // Thay đổi từ 'key' thành 'id'

    if (indexToRemove !== -1) {
      currentHandleIncomes.splice(indexToRemove, 1);
    }

    state.handleIncomes = currentHandleIncomes; // Thay đổi từ 'debts' thành 'handleIncomes'
  },
};
