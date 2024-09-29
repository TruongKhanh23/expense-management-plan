<template>
  <h2 class="font-semibold text-lg my-4">Thu nhập</h2>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(item, index) in dynamicValidateForm.incomes"
      :key="item.key"
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
          v-model:value="item.source"
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
import { useStore } from "vuex";
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
import { setIncomes, deleteIncome } from "@/composables/incomes/index.js";
import { setAllHandleIncomes } from "@/composables/handleIncomes";
import { uuid } from "vue-uuid";

interface Income {
  source: string;
  amount: number;
  key: string;
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
  setup(props) {
    const store = useStore();
    const formRef = ref<FormInstance>();

    const handleIncomes = computed(() => store.getters.getHandleIncomes);
    const incomes = computed(() => {
      const data = props.incomes ?? [];
      return data;
    });

    const dynamicValidateForm = reactive<{ incomes: Income[] }>({
      incomes: incomes.value ? incomes : ([] as any),
    });
    const removeItem = (item: Income) => {
      const index = dynamicValidateForm.incomes.indexOf(item);
      deleteIncome(item.key);
      if (index !== -1) {
        dynamicValidateForm.incomes.splice(index, 1);
      }
    };
    const addItem = () => {
      dynamicValidateForm.incomes.push({
        source: "",
        amount: 0,
        key: uuid.v1(),
      });
    };
    const onFinish = async () => {
      store.dispatch("setIncomes", dynamicValidateForm.incomes);
      await setIncomes(dynamicValidateForm.incomes);
      await setAllHandleIncomes(handleIncomes.value);
    };

    return { formRef, removeItem, dynamicValidateForm, addItem, onFinish };
  },
};
</script>
