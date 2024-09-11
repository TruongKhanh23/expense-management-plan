<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(item, index) in dynamicValidateForm"
      :key="index"
      style="display: flex; margin-bottom: 8px"
    >
      <a-form-item
        :name="[index, 'name']"
        :rules="[ { required: true, message: 'Missing name' } ]"
      >
        <a-input v-model:value="item.name" placeholder="Debt name" />
      </a-form-item>
      <a-form-item
        :name="[index, 'amount']"
        :rules="[ { required: true, message: 'Missing amount' } ]"
      >
        <a-input-number
          v-model:value="item.amount"
          placeholder="Amount"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item
        :name="[index, 'startDate']"
        :rules="{
          required: true,
          message: 'Missing start date',
        }"
      >
        <a-date-picker
          v-model:value="item.startDate"
          placeholder="Start Date"
          style="width: 100%"
          format="DD/MM/YY"
        />
      </a-form-item>
      <a-space align="baseline">
        <a-form-item
          :name="[index, 'isFinished']"
          :rules="[ { required: true, message: 'Missing isFinished' } ]"
        >
          <a-input
            v-model:value="item.isFinished"
            :disabled="true"
            placeholder="Debt isFinished"
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
import { ref, computed } from "vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
import { setDebt, deleteDebt } from "@/composables/debt/index.js";
import { Form, Space, FormItem, Input, Button, InputNumber, DatePicker } from "ant-design-vue";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useStore } from "vuex";

interface Debt {
  key: string;
  name: string;
  amount: number;
  startDate: Dayjs | null;
  isFinished: string;
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
    ADatePicker: DatePicker,
  },
  setup() {
    const formRef = ref<FormInstance>();
    const store = useStore();

    // Computed property to get debts from Vuex store and map to Dayjs
    const dynamicValidateForm = computed(() => 
      store.getters.getDebts.map(debt => ({
        ...debt,
        startDate: dayjs(debt.startDate) // Convert to Dayjs object
      }))
    );

    const removeItem = async (item: Debt) => {
      store.dispatch("removeDebt", item.key);
      // No need to call deleteDebt here if removeDebt already handles it
      await deleteDebt(item.key)
    };

    const addItem = () => {
      store.dispatch("addDebt");
    };

    const onFinish = async () => {
      // Convert Dayjs objects back to string if necessary
      const formattedDebts = dynamicValidateForm.value.map(debt => ({
        ...debt,
        startDate: debt.startDate?.format('YYYY-MM-DD') // Convert back to string
      }));
      
      store.dispatch("setDebts", formattedDebts);
       await setDebt(formattedDebts);
    };

    return { formRef, removeItem, dynamicValidateForm, addItem, onFinish, dayjs };
  },
};
</script>

<style>
.ant-picker-clear {
  display: none;
}
</style>
