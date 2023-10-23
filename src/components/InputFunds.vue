<template>
  <a-form
    :model="funds"
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
              <a-input v-model:value="funds.necessity" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="Financial Freedom"
              name="freedom"
              :rules="[
                {
                  required: true,
                  message: 'Please input financial freedom percentage!',
                },
              ]"
            >
              <a-input v-model:value="funds.freedom" />
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
              <a-input v-model:value="funds.education" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              label="Relax"
              name="relax"
              :rules="[
                { required: true, message: 'Please input relax percentage!' },
              ]"
            >
              <a-input v-model:value="funds.relax" />
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
              <a-input v-model:value="funds.giving" />
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
              <a-input v-model:value="funds.longTermSaving" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row> </a-row>
  </a-form>
</template>
<script lang="ts">
import { ref, reactive, computed } from "vue";
import { Col, Form, Row, FormItem, Input, Button } from "ant-design-vue";

interface Funds {
  necessity: number;
  freedom: number;
  education: number;
  relax: number;
  giving: number;
  longTermSaving: number;
}
interface FundItem {
  id: string;
  percentage: number;
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
    const funds = reactive<Funds>({
      necessity: 0,
      freedom: 0,
      education: 0,
      relax: 0,
      giving: 0,
      longTermSaving: 0,
    });
    const fundsStorageString = ref(JSON.parse(localStorage.getItem("funds") ?? ""));

    const onFinish = (values: any) => {
      let totalPercent: number = 0;
      Object.keys(values).forEach((field) => {
        totalPercent = totalPercent + parseInt(values[field]);
        fundsStorageString.value.find((item: FundItem) => item.id === field).percentage = parseInt(values[field])
      });
      
      // Check total percent
      if (totalPercent != 100) {
        alert("Total of funds percentage must be 100%! Please modify!");
      } else {
        localStorage.setItem("funds", JSON.stringify(fundsStorageString.value))
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    const disabled = computed(() => {
      return !(
        funds.necessity &&
        funds.freedom &&
        funds.education &&
        funds.relax &&
        funds.giving &&
        funds.longTermSaving
      );
    });
    return { funds, onFinish, onFinishFailed, disabled };
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
