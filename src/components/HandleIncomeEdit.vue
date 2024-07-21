<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
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
            placeholder="Amount"
            style="width: 100%"
          />
        </a-form-item>
        <MinusCircleOutlined @click="removeItem(item)" />
      </a-space>
    </a-space>
    <!-- Button Add Item & Button Submit-->
    <a-form-item>
      <a-button type="dashed" block @click="addItem">
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
import { reactive, ref, computed } from "vue";
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
import type { Dayjs } from "dayjs";

interface HandleIncome {
  key: string;
  type: string;
  wallet: string;
  fund: string;
  amount: number;
  isDebt: string;
  debtId: string;
}

type DebtItem = {
  key: string;
  name: string;
  amount: number;
  startDate: string | Dayjs;
  isFinished: string;
};

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
    const formRef = ref<FormInstance>();

    const debtsString = localStorage.getItem("debt");
    const debts: DebtItem[] = debtsString ? JSON.parse(debtsString) : [];

    const debtOptions = debts.map((item) => ({
      label: item.name,
      value: item.key,
    }));

    const options = [{ label: "", value: "" }];
    if (debts.length > 0) {
      for (const item of debts) {
        options.push({ label: item.name, value: item.key });
      }
    }

    const isDebtOptions = [
      { label: "Tích lũy", value: "false" },
      { label: "Trả nợ", value: "true" },
    ];

    const handleIncomesStorageString = computed(
      (handleIncomes: HandleIncome[]) => {
        return props.data ?? handleIncomes;
      },
    );

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

    const addItem = () => {
      dynamicValidateForm.handleIncomes.push({
        key: "",
        fund: "",
        amount: 0,
        wallet: "",
        type: "",
        isDebt: "false",
        debtId: "Please choose a debt",
      });
    };

    const onFinish = async () => {
      const stringifyIncomes = JSON.stringify(
        dynamicValidateForm.handleIncomes,
      );
      localStorage.setItem("handleIncomes", stringifyIncomes);
      await setHandleIncomes(dynamicValidateForm.handleIncomes);
    };

    return {
      formRef,
      isDebtOptions,
      debtOptions,
      removeItem,
      dynamicValidateForm,
      addItem,
      onFinish,
    };
  },
};
</script>

<style scoped></style>
