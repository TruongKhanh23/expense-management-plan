<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <div class="flex flex-row mb-4">
      <strong class="flex-1">Identity Code</strong>
      <strong class="flex-1">Name</strong>
    </div>

    <a-space
      v-for="(item, index) in dynamicValidateForm"
      :key="index"
      style="display: flex; margin-bottom: 8px"
    >
      <a-form-item
        :name="[index, 'id']"
        :rules="[{ required: true, message: 'Missing id' }]"
      >
        <a-input v-model:value="item.id" placeholder="Id" />
      </a-form-item>
      <a-space align="baseline">
        <a-form-item
          :name="[index, 'name']"
          :rules="[{ required: true, message: 'Missing name' }]"
        >
          <a-input
            v-model:value="item.name"
            placeholder="NecessaryThing name"
          />
        </a-form-item>
        <a-space align="baseline">
          <MinusCircleOutlined @click="removeItem(item)" />
        </a-space>
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
import {
  setNecessaryThings,
  deleteNecessaryThing,
} from "@/composables/necessaryThings/index.js";
import { Form, Space, FormItem, Input, Button } from "ant-design-vue";
import { useStore } from "vuex";
import type { NecessaryThingsType } from "@/types/types";

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
  setup() {
    const formRef = ref<FormInstance>();
    const store = useStore();

    const dynamicValidateForm = computed(
      () => store.getters.getNecessaryThingsType,
    );

    const removeItem = async (item: NecessaryThingsType) => {
      store.dispatch("removeNecessaryThingType", item.id);
      await deleteNecessaryThing(item.id);
    };

    const addItem = () => {
      store.dispatch("addNecessaryThingType");
    };

    const onFinish = async () => {
      const formattedNecessaryThings = dynamicValidateForm.value.map(
        (thing) => ({
          ...thing,
        }),
      );

      store.dispatch("setNecessaryThingsType", formattedNecessaryThings);
      await setNecessaryThings(formattedNecessaryThings);
    };

    return {
      formRef,
      removeItem,
      dynamicValidateForm,
      addItem,
      onFinish,
    };
  },
};
</script>

<style>
.ant-picker-clear {
  display: none;
}
</style>
