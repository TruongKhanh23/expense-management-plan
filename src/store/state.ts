import type { HandleIncomeType, HandleIncomeItem } from "@/types/types";
import type {
  DataIncomeType,
  EstimateNecessityType,
  DebtItem,
  FundItem,
  CurrentChooseMonth,
  Permission,
  NecessaryThingsItem,
  NecessaryThingsType
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
  isAllowEditing: boolean;
  isDark: boolean;
  user: object;
  permissions: Permission[];
  necessaryThings: NecessaryThingsItem[];
  necessaryThingsType: NecessaryThingsType[];
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
  isAllowEditing: false,
  user: {},
  permissions: [],
  necessaryThings: [],
  necessaryThingsType: [],
};
