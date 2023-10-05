<template>
  <a-form
    :model="formState"
    name="horizontal_login"
    layout="inline"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-row class="flex items-center justify-center">
      <a-col :span="3">
        <div class="flex items-center justify-center flex-col">
          <p class="font-bold my-2 uppercase">Tỷ lệ quỹ</p>
          <a-form-item>
            <a-button type="default" html-type="submit">Cập nhật</a-button>
          </a-form-item>
        </div>
      </a-col>
      <a-col :span="21">
        <a-row :gutter="20" class="pl-12">
          <a-col :span="4">
            <a-form-item
              label="Necessity"
              name="necessity"
              :rules="[
                {
                  required: true,
                  message: 'Please input necessity percentage!',
                },
              ]"
            >
              <a-input v-model:value="formState.necessity" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="Financial Freedom"
              name="financialFreedom"
              :rules="[
                {
                  required: true,
                  message: 'Please input financial freedom percentage!',
                },
              ]"
            >
              <a-input v-model:value="formState.financialFreedom" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="Education"
              name="education"
              :rules="[
                {
                  required: true,
                  message: 'Please input education percentage!',
                },
              ]"
            >
              <a-input v-model:value="formState.education" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="Enjoy"
              name="enjoy"
              :rules="[
                { required: true, message: 'Please input enjoy percentage!' },
              ]"
            >
              <a-input v-model:value="formState.enjoy" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="Giving"
              name="giving"
              :rules="[
                { required: true, message: 'Please input giving percentage!' },
              ]"
            >
              <a-input v-model:value="formState.giving" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="Long Term Saving"
              name="longTermSaving"
              :rules="[
                {
                  required: true,
                  message: 'Please input long term saving percentage!',
                },
              ]"
            >
              <a-input v-model:value="formState.longTermSaving" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row> </a-row>
  </a-form>
</template>
<script lang="ts">
import { reactive, computed } from "vue";
import { Col, Form, Row, FormItem, Input, Button } from "ant-design-vue";

interface FormState {
  necessity: number;
  financialFreedom: number;
  education: number;
  enjoy: number;
  giving: number;
  longTermSaving: number;
}

export default {
  components: {
    AForm: Form,
    ARow: Row,
    ACol: Col,
    AFormItem: FormItem,
    AInput: Input,
    AButton: Button,
  },
  setup() {
    const formState = reactive<FormState>({
      necessity: 0,
      financialFreedom: 0,
      education: 0,
      enjoy: 0,
      giving: 0,
      longTermSaving: 0,
    });
    const onFinish = (values: any) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    const disabled = computed(() => {
      return !(
        formState.necessity &&
        formState.financialFreedom &&
        formState.education &&
        formState.enjoy &&
        formState.giving &&
        formState.longTermSaving
      );
    });
    return { formState, onFinish, onFinishFailed, disabled };
  },
};
</script>
<style scoped>
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
[data-theme="dark"] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
[data-theme="dark"] #components-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}
</style>
