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
}

export const state: State = {
  debts: [],
  handleIncomes: [],
  allHandleIncomesIsDebt: [],
  incomes: [],
  estimateNecessities: [],
  funds: [],
  currentChooseMonth: { year: "", monthYear: "" },
};
