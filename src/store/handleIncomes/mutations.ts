import { v1 as uuidv1 } from "uuid";
import { State } from "@/store/state";
import type { HandleIncomeType, HandleIncomeItem } from "@/types/types"; // Import HandleIncomeItem

export const mutations = {
  addHandleIncome(state: State, { type }) {
    const newHandleIncome: HandleIncomeItem = {
      key: uuidv1(),
      wallet: "",
      type: type,
      fund: "",
      amount: 0,
      debtId: 0,
      isDebt: "false",
      isSolved: false,
    };
    //state.handleIncomes.find(item.key == type).push(newHandleIncome); // Thay đổi từ 'debts' thành 'handleIncomes'
  },
  setHandleIncomes(
    state: State,
    { handleIncomes }: { handleIncomes: HandleIncomeType[] },
  ) {
    // Cập nhật giá trị mới cho state.handleIncomes
    state.handleIncomes = handleIncomes;

    // Nếu allHandleIncomesIsDebt có giá trị
    if (state.allHandleIncomesIsDebt) {
      const allHandleIncomes: HandleIncomeItem[] = [];
      handleIncomes.forEach((category) => {
        category.items.forEach((handleIncomeItem: HandleIncomeItem) => {
          allHandleIncomes.push(handleIncomeItem);
        });
      });

      // Lặp qua từng danh mục trong handleIncomes
      allHandleIncomes.forEach((newItem) => {
        // Tìm item trong allHandleIncomesIsDebt có cùng debtId
        const existingItems = state.allHandleIncomesIsDebt.filter(
          (existingItem) => existingItem.debtId === newItem.debtId,
        );

        // Kiểm tra nếu không có item nào trong existingItems có cùng key với newItem
        const hasMatchingKey = existingItems.some(
          (existingItem) => existingItem.key === newItem.key,
        );

        if (existingItems.length > 0 && !hasMatchingKey) {
          // Nếu có ít nhất một item với cùng debtId nhưng không có item nào trùng key
          state.allHandleIncomesIsDebt.push(newItem);
        } else {
          const matchingItem = state.allHandleIncomesIsDebt.find(
            (existingItem) => {
              return (
                existingItem.key === newItem.key &&
                existingItem.type === newItem.type &&
                existingItem.debtId === newItem.debtId
              );
            },
          );

          if (matchingItem) {
            // Cập nhật giá trị của allHandleIncomeIsDebt nếu tìm thấy item tương tự
            Object.assign(matchingItem, newItem);
          }
        }
      });

      const allHandleIncomeKeys = new Set(
        allHandleIncomes.map((item) => item.key),
      );
      state.allHandleIncomesIsDebt = state.allHandleIncomesIsDebt.filter(
        (item) => allHandleIncomeKeys.has(item.key),
      );
    }
  },
  setAllHandleIncomesIsDebt(
    state: State,
    { allHandleIncomesIsDebt }: { allHandleIncomesIsDebt: HandleIncomeItem[] },
  ) {
    state.allHandleIncomesIsDebt = allHandleIncomesIsDebt; // Thay đổi từ 'debts' thành 'handleIncomes'
  },
  removeHandleIncome(state: State, { id }: { id: string }) {
    const currentHandleIncomes = state.handleIncomes; // Thay đổi từ 'debts' thành 'handleIncomes'
    const indexToRemove = currentHandleIncomes.findIndex(
      (item) => item.key === id,
    ); // Thay đổi từ 'key' thành 'id'

    if (indexToRemove !== -1) {
      currentHandleIncomes.splice(indexToRemove, 1);
    }

    state.handleIncomes = currentHandleIncomes; // Thay đổi từ 'debts' thành 'handleIncomes'
  },
};
