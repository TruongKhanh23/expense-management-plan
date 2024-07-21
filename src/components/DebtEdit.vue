<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(item, index) in dynamicValidateForm.debt"
      :key="index"
      style="display: flex; margin-bottom: 8px"
    >
      <a-form-item
        :name="['debt', index, 'name']"
        :rules="{
          required: true,
          message: 'Missing name',
        }"
      >
        <a-input v-model:value="item.name" placeholder="Debt name" />
      </a-form-item>
      <a-form-item
        :name="['debt', index, 'amount']"
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
      <a-form-item
        :name="['debt', index, 'startDate']"
        :rules="{
          required: true,
          message: 'Missing start date',
        }"
      >
        <a-date-picker
          v-model:value="item.startDate"
          placeholder="Start Date"
          style="width: 100%"
        />
      </a-form-item>
      <a-space align="baseline">
        <a-form-item
          :name="['debt', index, 'isFinished']"
          :rules="{
            required: true,
            message: 'Missing isFinished',
          }"
        >
          <a-input
            v-model:value="item.isFinished"
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
import { reactive, ref, computed } from "vue";
import { uuid } from "vue-uuid";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
import { setDebt, deleteDebt } from "@/composables/debt/index.js";
import {
  Form,
  Space,
  FormItem,
  Input,
  Button,
  InputNumber,
  DatePicker,
} from "ant-design-vue";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

interface Debt {
  key: string;
  name: string;
  amount: number;
  startDate: string | Dayjs;
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
  props: {
    data: {
      type: Object,
      default: () => ({ debt: [] }),
    },
  },
  setup(props) {
    const formRef = ref<FormInstance>();

    const debtStorageString = computed((debt: Debt[]) => {
      return props.data ?? debt;
    });

    const debtStorage = computed(() => {
      debtStorageString.value.map((item: any) => {
        item.startDate = dayjs(item.startDate);
      });
      return debtStorageString.value;
    });

    const dynamicValidateForm = reactive<{ debt: Debt[] }>({
      debt: debtStorageString.value ? debtStorage : ([] as any),
    });

    const removeItem = (item: Debt) => {
      const index = dynamicValidateForm.debt.indexOf(item);
      deleteDebt(item.key);
      if (index !== -1) {
        dynamicValidateForm.debt.splice(index, 1);
      }
    };

    const addItem = () => {
      const currentDate = dayjs();

      dynamicValidateForm.debt.push({
        key: uuid.v1(),
        name: "",
        amount: 0,
        startDate: currentDate, // Khởi tạo trường startDate với ngày hôm nay
        isFinished: "",
      });
    };

    const onFinish = async () => {
      const stringifyDebts = JSON.stringify(dynamicValidateForm.debt);
      localStorage.setItem("debt", stringifyDebts);
      console.log("stringifyDebts", stringifyDebts);

      console.log("dynamicValidateForm.debt", dynamicValidateForm.debt);

      await setDebt(dynamicValidateForm.debt);
    };

    return { formRef, removeItem, dynamicValidateForm, addItem, onFinish };
  },
};
</script>
<style>
.ant-picker-clear {
  display: none;
}
</style>
