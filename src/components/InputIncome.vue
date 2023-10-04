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
      align="baseline"
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
      <a-form-item
        :name="['incomes', index, 'amount']"
        :rules="{
          required: true,
          message: 'Missing amount',
        }"
      >
        <a-input v-model:value="user.amount" placeholder="Amount" />
      </a-form-item>
      <MinusCircleOutlined @click="removeUser(user)" />
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
import { reactive, ref } from "vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
import { Form, Space, FormItem, Input, Button } from "ant-design-vue";

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
    MinusCircleOutlined,
    PlusOutlined,
    AButton: Button,
  },
  emits: ["action:updateDataIncome"],
  setup(_, { emit }) {
    const formRef = ref<FormInstance>();
    const incomesStorageString = localStorage.getItem("incomes");
    let incomesStorage;

    if (incomesStorageString !== null) {
      incomesStorage = JSON.parse(incomesStorageString);
      console.log("incomesStorage", incomesStorage);
      emit("action:updateDataIncome", incomesStorage)
    }

    const dynamicValidateForm = reactive<{ incomes: Income[] }>({
      incomes: incomesStorageString !== null ? incomesStorage : [],
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
    const onFinish = (values: any) => {
      console.log("Received values of form:", values);
      console.log("dynamicValidateForm.incomes:", dynamicValidateForm.incomes);
      window.localStorage.setItem("incomes", JSON.stringify(dynamicValidateForm.incomes));
      emit("action:updateDataIncome", dynamicValidateForm.incomes)
    };
    return { formRef, removeUser, dynamicValidateForm, addUser, onFinish };
  },
};
</script>
