<template>
  <div>Handle Income Edit View</div>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(item, index) in dynamicValidateForm.handleIncomes"
      :key="item.type"
      style="display: flex; margin-bottom: 8px"
    >
      <a-form-item
        :name="['handleIncomes', index, 'type']"
        :rules="{
          required: true,
          message: 'Missing type',
        }"
      >
        <a-input v-model:value="item.type" placeholder="Income from (type)" />
      </a-form-item>
      <a-form-item
        :name="['handleIncomes', index, 'wallet']"
        :rules="{
          required: true,
          message: 'Missing wallet',
        }"
      >
        <a-input
          v-model:value="item.wallet"
          placeholder="Income from (wallet)"
        />
      </a-form-item>
      <a-form-item
        :name="['handleIncomes', index, 'fund']"
        :rules="{
          required: true,
          message: 'Missing fund',
        }"
      >
        <a-input v-model:value="item.fund" placeholder="Income from (fund)" />
      </a-form-item>
      <a-space align="baseline">
        <a-form-item
          :name="['handleIncomes', index, 'amount']"
          :rules="{
            required: true,
            message: 'Missing amount',
          }"
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
    <a-form-item>
      <a-button type="dashed" block @click="addItem">
        <PlusOutlined />
        Add item
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="default" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { reactive, ref, computed } from "vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
import { setHandleIncomes } from "@/composables/handleIncomes/index.js"
import {
  Form,
  Space,
  FormItem,
  Input,
  Button,
  InputNumber,
} from "ant-design-vue";

interface HandleIncome {
  type: string;
  wallet: string;
  fund: string;
  amount: number;
}

export default {
  components: {
    AForm: Form,
    ASpace: Space,
    AFormItem: FormItem,
    AInput: Input,
    AInputNumber: InputNumber,
    AButton: Button,
    MinusCircleOutlined,
    PlusOutlined,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const formRef = ref<FormInstance>();
    const handleIncomesStorageString = computed(() => {
      return props.data ?? [];
    });

    const handleIncomesStorage = computed(() => {
      return handleIncomesStorageString.value;
    });

    const dynamicValidateForm = reactive<{ handleIncomes: HandleIncome[] }>({
      handleIncomes: handleIncomesStorageString.value
        ? handleIncomesStorage
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
        fund: "",
        amount: 0,
        wallet: "",
        type: "",
      });
    };
    const onFinish = async () => {
      const stringifyIncomes = JSON.stringify(
        dynamicValidateForm.handleIncomes,
      );
      localStorage.setItem("handleIncomes", stringifyIncomes);
      await setHandleIncomes(dynamicValidateForm.handleIncomes)
    };
    return { formRef, removeItem, dynamicValidateForm, addItem, onFinish };
  },
};
</script>
