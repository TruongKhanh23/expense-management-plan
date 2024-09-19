import type { HandleIncomeType, HandleIncomeItem } from "@/types/types";
import type {
  DataIncomeType,
  EstimateNecessityType,
  DebtItem,
  FundItem,
  CurrentChooseMonth,
} from "@/types/types";

export interface State {
  debts: DebtItem[];
  handleIncomes: HandleIncomeType[];
  allHandleIncomesIsDebt: HandleIncomeItem[];
  incomes: DataIncomeType[];
  estimateNecessities: EstimateNecessityType[];
  funds: FundItem[];
  currentChooseMonth: CurrentChooseMonth;
  isOpenCreateNewMonthModal: boolean;
  isFundsEditable: boolean;
  isVisibleLimitation: boolean;
  isDark: boolean;
}

export const state: State = {
  debts: [],
  handleIncomes: [],
  allHandleIncomesIsDebt: [],
  incomes: [],
  estimateNecessities: [],
  funds: [],
  currentChooseMonth: { year: "", monthYear: "" },
  isOpenCreateNewMonthModal: false,
  isFundsEditable: false,
  isVisibleLimitation: false,
  isDark: false,
};
