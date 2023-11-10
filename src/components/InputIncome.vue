<template>
  <h2 class="font-semibold text-lg my-4">Thu nhập</h2>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(user, index) in dynamicValidateForm.incomes"
      :key="user.id"
      style="display: flex; margin-bottom: 8px"
    >
      <a-form-item
        :name="['incomes', index, 'source']"
        :rules="{
          required: true,
          message: 'Missing source',
        }"
      >
        <a-input
          v-model:value="user.source"
          placeholder="Income from (source)"
        />
      </a-form-item>
      <a-space align="baseline">
        <a-form-item
          :name="['incomes', index, 'amount']"
          :rules="{
            required: true,
            message: 'Missing amount',
          }"
        >
          <a-input-number v-model:value="user.amount" placeholder="Amount" style="width: 100%" />
        </a-form-item>
        <MinusCircleOutlined @click="removeUser(user)" />
      </a-space>
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addUser">
        <PlusOutlined />
        Add income
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
import {
  Form,
  Space,
  FormItem,
  Input,
  Button,
  InputNumber,
} from "ant-design-vue";
import { setIncomes } from "@/composables/incomes/index.js";

interface Income {
  source: string;
  amount: number;
  id: number;
}

export default {
  components: {
    AForm: Form,
    ASpace: Space,
    AFormItem: FormItem,
    AInput: Input,
    AInputNumber: InputNumber,
    MinusCircleOutlined,
    PlusOutlined,
    AButton: Button,
  },
  props: {
    incomes: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["action:updateDataIncome"],
  setup(props, { emit }) {
    const formRef = ref<FormInstance>();
    const incomesStorageString = computed(() => {
      return props.incomes ?? [];
    });

    const incomesStorage = computed(() => {
      emit("action:updateDataIncome", incomesStorageString.value);
      return incomesStorageString.value;
    });

    const dynamicValidateForm = reactive<{ incomes: Income[] }>({
      incomes: incomesStorageString.value ? incomesStorage : ([] as any),
    });
    const removeUser = (item: Income) => {
      const index = dynamicValidateForm.incomes.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.incomes.splice(index, 1);
      }
    };
    const addUser = () => {
      dynamicValidateForm.incomes.push({
        source: "",
        amount: 0,
        id: Date.now(),
      });
    };
    const onFinish = async () => {
      const stringifyIncomes = JSON.stringify(dynamicValidateForm.incomes);
      localStorage.setItem("incomes", stringifyIncomes);
      emit("action:updateDataIncome", dynamicValidateForm.incomes);
      await setIncomes(dynamicValidateForm.incomes);
    };

    return { formRef, removeUser, dynamicValidateForm, addUser, onFinish };
  },
};
</script>
