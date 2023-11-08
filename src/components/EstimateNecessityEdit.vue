<template>
  <div class="mt-7 ml-2">
    <a-form
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="dynamicValidateForm"
      @finish="onFinish"
    >
      <a-space
        v-for="(item, index) in dynamicValidateForm.estimateNecessity"
        :key="item.id"
        style="display: flex; margin-bottom: 6px"
        align="baseline"
      >
        <a-form-item
          :name="['estimateNecessity', index, 'name']"
          :rules="{
            required: true,
            message: 'Missing name',
          }"
        >
          <a-input
            v-model:value="item.name"
            placeholder="Income from (source)"
          />
        </a-form-item>
        <a-form-item
          :name="['estimateNecessity', index, 'amount']"
          :rules="{
            required: true,
            message: 'Missing amount',
          }"
        >
          <a-input v-model:value="item.amount" placeholder="Amount" style="text-align: right;" />
        </a-form-item>
        <MinusCircleOutlined @click="removeItem(item)" />
      </a-space>
      <a-form-item>
        <a-button type="dashed" block @click="addItem">
          <PlusOutlined />
          Thêm dự chi
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="default" html-type="submit">Cập nhật</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { reactive, ref, computed } from "vue";
import type { FormInstance } from "ant-design-vue";
import { Form, Space, FormItem, Input, Button } from "ant-design-vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";

interface EstimateNecessity {
  name: string;
  amount: number;
  id: number;
}

export default {
  components: {
    AForm: Form,
    ASpace: Space,
    AFormItem: FormItem,
    AInput: Input,
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
    const estimateNecessityStorageString = computed(() => {
      console.log("props.data", props.data);
      return props.data.details ?? [];
    });
    const estimateNecessity = computed(() => {
      return estimateNecessityStorageString.value;
    });

    const dynamicValidateForm = reactive<{
      estimateNecessity: EstimateNecessity[];
    }>({
      estimateNecessity: estimateNecessityStorageString.value
        ? estimateNecessity
        : ([] as any),
    });

    const removeItem = (item: EstimateNecessity) => {
      const index = dynamicValidateForm.estimateNecessity.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.estimateNecessity.splice(index, 1);
      }
    };
    const addItem = () => {
      dynamicValidateForm.estimateNecessity.push({
        name: "",
        amount: 0,
        id: Date.now(),
      });
    };
    const onFinish = () => {
      const stringifyEstimateNecessity = JSON.stringify(
        dynamicValidateForm.estimateNecessity,
      );
      window.localStorage.setItem(
        "estimateNecessity",
        stringifyEstimateNecessity,
      );
    };

    return { formRef, removeItem, dynamicValidateForm, addItem, onFinish };
  },
};
</script>