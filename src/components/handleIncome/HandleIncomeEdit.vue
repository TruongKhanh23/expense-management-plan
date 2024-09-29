<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish(true)"
  >
    <!-- Form Fields -->

    <a-space
      v-for="(item, index) in dynamicValidateForm.handleIncomes"
      :key="index"
      style="display: flex; margin-bottom: 8px"
    >
      <a-form-item
        :name="['handleIncomes', index, 'isDebt']"
        :rules="{ required: true, message: 'Missing isDebt' }"
      >
        <a-select
          v-model:value="item.isDebt"
          placeholder="isDebt?"
          :options="isDebtOptions"
          style="min-width: 90px"
        />
      </a-form-item>
      <a-form-item
        v-if="item.isDebt === 'true'"
        :name="['handleIncomes', index, 'debtId']"
        :rules="{ required: true, message: 'Missing debtId' }"
      >
        <a-select
          v-model:value="item.debtId"
          placeholder="Income from (debtId)"
          :options="debtOptions"
          style="width: 80px"
        />
      </a-form-item>
      <a-form-item
        :name="['handleIncomes', index, 'wallet']"
        :rules="{ required: true, message: 'Missing wallet' }"
      >
        <a-input
          v-model:value="item.wallet"
          placeholder="Income from (wallet)"
        />
      </a-form-item>
      <a-form-item
        :name="['handleIncomes', index, 'fund']"
        :rules="{ required: true, message: 'Missing fund' }"
      >
        <a-input v-model:value="item.fund" placeholder="Income from (fund)" />
      </a-form-item>
      <a-space align="baseline">
        <a-form-item
          :name="['handleIncomes', index, 'amount']"
          :rules="{ required: true, message: 'Missing amount' }"
        >
          <a-input-number
            v-model:value="item.amount"
            :disabled="isFundRestricted(item.fund)"
            placeholder="Amount"
            style="width: 100%"
            @change="recalculateDisabledAmounts"
          />
        </a-form-item>
        <MinusCircleOutlined @click="removeItem(item)" />
      </a-space>
    </a-space>
    <!-- Button Add Item & Button Submit-->
    <a-form-item>
      <a-button type="dashed" block @click="addItem(data)">
        <PlusOutlined />
        Add item
      </a-button>
    </a-form-item>
    <a-form-item>
      <div class="flex justify-between">
        <a-button type="default" html-type="submit">Submit</a-button>
        <a-tag color="green" class="flex justify-center items-center">
          {{ dynamicValidateForm.handleIncomes[0].type.toUpperCase() }}
        </a-tag>
      </div>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { reactive, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
import { setHandleIncomes } from "@/composables/handleIncomes/index.js";
import {
  Form,
  Space,
  FormItem,
  Input,
  Button,
  InputNumber,
  Select,
  Tag,
} from "ant-design-vue";
import unorm from "unorm";
import { calculateLimitation } from "@/composables/funds/index";
import { uuid } from "vue-uuid";

interface HandleIncome {
  key: string;
  type: string;
  wallet: string;
  fund: string;
  amount: number;
  isDebt: string;
  debtId: string;
  isSolved: boolean;
}

export default {
  components: {
    AForm: Form,
    ASpace: Space,
    AFormItem: FormItem,
    AInput: Input,
    AInputNumber: InputNumber,
    AButton: Button,
    ASelect: Select,
    ATag: Tag,
    MinusCircleOutlined,
    PlusOutlined,
  },
  props: {
    data: {
      type: Object,
      default: () => ({ handleIncomes: [] }),
    },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref<FormInstance>();

    const debts = computed(() => store.getters.getDebts);
    const totalIncome = computed(() => store.getters.getTotalIncome);
    const funds = computed(() => store.getters.getFunds);

    const debtOptions = computed(() =>
      debts.value.map((item) => ({
        label: item.name,
        value: item.key,
      })),
    );

    const options = [{ label: "", value: "" }];
    if (debts.value.length > 0) {
      for (const item of debts.value) {
        options.push({ label: item.name, value: item.key });
      }
    }

    const isDebtOptions = [
      { label: "Tích lũy", value: "false" },
      { label: "Trả nợ", value: "true" },
    ];

    const handleIncomesStorageString = computed(() => {
      return props.data ?? [];
    });

    const handleIncomesStorage = computed(() => {
      return handleIncomesStorageString.value;
    });

    const dynamicValidateForm = reactive<{ handleIncomes: HandleIncome[] }>({
      handleIncomes: handleIncomesStorage.value.length
        ? handleIncomesStorage.value
        : ([] as any),
    });

    const removeItem = (item: HandleIncome) => {
      const index = dynamicValidateForm.handleIncomes.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.handleIncomes.splice(index, 1);
      }
    };

    const addItem = (handleIncomes: any) => {
      dynamicValidateForm.handleIncomes.push({
        key: uuid.v1(),
        fund: "",
        amount: 0,
        wallet: "",
        isSolved: false,
        type: handleIncomes[0].type,
        isDebt: "false",
        debtId: "Please choose a debt",
      });
    };

    const onFinish = async (isUsingToast: boolean) => {
      await setHandleIncomes(dynamicValidateForm.handleIncomes, isUsingToast);
    };

    const restrictedFunds = [
      "học tập",
      "du lịch",
      "cho đi",
      "hưởng thụ",
      "tích lũy",
    ];

    const normalizeString = (str: string) => {
      return unorm
        .nfkd(str)
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    };

    const isFundRestricted = (fund: string) => {
      const normalizedFund = normalizeString(fund);
      return restrictedFunds.some((term) =>
        normalizedFund.includes(normalizeString(term)),
      );
    };

    const recalculateDisabledAmounts = () => {
      const fundTypes = [
        "necessity",
        "freedom",
        "education",
        "enjoy",
        "giving",
        "longTermSaving",
      ];

      // Tạo một đối tượng chứa các giới hạn quỹ
      const fundLimits = fundTypes.reduce((limits, type) => {
        const fund = funds.value.find((item) => item.id === type);
        if (fund) {
          limits[type] = calculateLimitation(
            totalIncome.value,
            fund.percentage,
          ).number;
        }
        return limits;
      }, {});

      // Cập nhật số tiền cho từng nguồn thu nhập
      dynamicValidateForm.handleIncomes.forEach((item) => {
        const fundType = item.type;
        if (fundType && isFundRestricted(item.fund)) {
          const totalOtherAmounts = dynamicValidateForm.handleIncomes
            .filter((income) => income !== item)
            .reduce((acc, income) => acc + income.amount, 0);
          item.amount = fundLimits[fundType] - totalOtherAmounts;
        }
      });

      const currentHandleIncomes = store.getters.getHandleIncomes;
      if (currentHandleIncomes) {
        const firstIncomeType = dynamicValidateForm.handleIncomes[0]?.type;
        if (firstIncomeType) {
          const type = currentHandleIncomes.find(
            (type) => type.key === firstIncomeType,
          );
          if (type) {
            type.items = dynamicValidateForm.handleIncomes;
            store.dispatch("setHandleIncomes", currentHandleIncomes);
          }
        }
      }
    };

    watch(
      () => [dynamicValidateForm.handleIncomes, funds, totalIncome],
      () => {
        recalculateDisabledAmounts();
      },
      {
        deep: true,
      },
    );

    return {
      formRef,
      isDebtOptions,
      debtOptions,
      dynamicValidateForm,
      removeItem,
      addItem,
      onFinish,
      isFundRestricted,
      calculateLimitation,
      recalculateDisabledAmounts,
    };
  },
};
</script>

<style scoped></style>
