<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space style="display: flex; flex-direction: column; margin-bottom: 16px">
      <a-row style="gap: 40px">
        <a-col><strong>Name</strong></a-col>
        <a-col><strong>Timespan (months)</strong></a-col>
        <a-col><strong>Save Per Month</strong></a-col>
        <a-col><strong>Limitation</strong></a-col>
        <a-col><strong>Type</strong></a-col>
      </a-row>
    </a-space>

    <a-space
      v-for="(item, index) in dynamicValidateForm"
      :key="index"
      style="display: flex; margin-bottom: 8px"
    >
      <a-form-item
        :name="[index, 'name']"
        :rules="[{ required: true, message: 'Missing name' }]"
      >
        <a-input v-model:value="item.name" placeholder="Name" />
      </a-form-item>

      <a-form-item
        :name="[index, 'timespan']"
        :rules="[{ required: true, message: 'Missing timespan' }]"
      >
        <a-input-number
          v-model:value="item.timespan"
          placeholder="Timespan"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item
        :name="[index, 'savePerMonth']"
        :rules="[{ required: true, message: 'Missing save per month' }]"
      >
        <a-input-number
          v-model:value="item.savePerMonth"
          placeholder="Save Per Month"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item
        :name="[index, 'limitation']"
        :rules="[{ required: true, message: 'Missing limitation' }]"
      >
        <a-input-number
          v-model:value="item.limitation"
          placeholder="Limitation"
          style="width: 100%"
        />
      </a-form-item>

      <a-space align="baseline">
        <a-form-item
          :name="[index, 'type']"
          :rules="[{ required: true, message: 'Missing type' }]"
        >
          <a-select
            v-model:value="item.type"
            placeholder="Select Type"
            style="width: 100%; min-width: 200px;"
          >
            <a-select-option
              v-for="(option, idx) in typeOptions"
              :key="idx"
              :value="option.value"
            >
              {{ option.label }}
            </a-select-option>
          </a-select>
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
import { setNecessaryThings, deleteNecessaryThing } from "@/composables/necessaryThings/index.js";
import { Form, Space, FormItem, Input, InputNumber, Select, Button, Row, Col } from "ant-design-vue";
import { useStore } from "vuex";
import type { NecessaryThingsItem } from "@/types/types";

export default {
  components: {
    AForm: Form,
    ASpace: Space,
    AFormItem: FormItem,
    AInput: Input,
    AInputNumber: InputNumber,
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
    MinusCircleOutlined,
    PlusOutlined,
    ARow: Row,
    ACol: Col,
  },
  setup() {
    const formRef = ref<FormInstance>();
    const store = useStore();

    // Lấy danh sách cần thiết từ Vuex store
    const dynamicValidateForm = computed(() => store.getters.getNecessaryThings);

    // Lấy danh sách các loại vật dụng không trùng và dịch tên
    const typeOptions = computed(() => {
      const uniqueTypes = [...new Set(dynamicValidateForm.value.map((item) => item.type))];
      const typeTranslations: Record<string, string> = {
        shampoo: "Dầu gội",
        skinCare: "Chăm sóc da",
        oralHealth: "Chăm sóc răng miệng",
        bodyCare: "Chăm sóc cơ thể",
        furniture: "Nội thất",
      };

      return uniqueTypes.map((type) => ({
        value: type,
        label: typeTranslations[type] || type,
      }));
    });

    const removeItem = async (item: NecessaryThingsItem) => {
      store.dispatch("removeNecessaryThing", item.id);
      await deleteNecessaryThing(item.id);
    };

    const addItem = () => {
      store.dispatch("addNecessaryThing");
    };

    const onFinish = async () => {
      const formattedNecessaryThings = dynamicValidateForm.value.map((thing) => ({
        ...thing,
      }));

      store.dispatch("setNecessaryThings", formattedNecessaryThings);
      await setNecessaryThings(formattedNecessaryThings);
    };

    return {
      formRef,
      removeItem,
      dynamicValidateForm,
      addItem,
      onFinish,
      typeOptions, // Truyền mảng option cho dropdown
    };
  },
};
</script>

<style>
.ant-picker-clear {
  display: none;
}
</style>
