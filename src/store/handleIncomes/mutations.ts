import { State } from "@/store/state";
import type { HandleIncomeType, HandleIncomeItem } from "@/types/types"; // Import HandleIncomeItem

export const mutations = {
  setHandleIncomes(
    state: State,
    { handleIncomes }: { handleIncomes: HandleIncomeType[] },
  ) {
    state.handleIncomes = handleIncomes;

    const allHandleIncomes: HandleIncomeItem[] = [];
    handleIncomes.forEach((category) => {
      category.items.forEach((handleIncomeItem: HandleIncomeItem) => {
        allHandleIncomes.push(handleIncomeItem);
      });
    });

    if (state.allHandleIncomesIsDebt.length > 0) {
      allHandleIncomes.forEach((newItem) => {
        const existingItems = state.allHandleIncomesIsDebt.filter(
          (existingItem) => existingItem.debtId === newItem.debtId,
        );

        const hasMatchingKey = existingItems.some(
          (existingItem) => existingItem.key === newItem.key,
        );

        if (existingItems.length > 0 && !hasMatchingKey) {
          // Thêm mới nếu đây là xử lý nợ mới
          state.allHandleIncomesIsDebt.push(newItem);
        } else {
          // Cập nhật nếu đây là xử lý nợ đã tồn tại
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
            Object.assign(matchingItem, newItem);
          }
        }
      });

      // Xóa những item của allHandleIncomeIsDebt mà allHandleIncomes không có
      const allHandleIncomeKeys = new Set(
        allHandleIncomes.map((item) => item.key),
      );
      state.allHandleIncomesIsDebt = state.allHandleIncomesIsDebt.filter(
        (item) => allHandleIncomeKeys.has(item.key),
      );
    } else {
      const newDebts = allHandleIncomes.filter((item) => item.isDebt == "true");
      newDebts.forEach((item) => {
        state.allHandleIncomesIsDebt.push(item);
      });
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
