<template>
  <div class="px-4">
    <ConfigProvider>
      <a-form
        :model="funds"
        name="horizontal_login"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <div class="flex justify-between mb-2">
          <div class="flex items-center">
            <div class="mr-2 flex items-center"><SettingOutlined /></div>
            <p class="font-bold">Thiết lập tỷ lệ</p>
          </div>
          <a-form-item class="custom-ant-form-item">
            <a-button type="default" html-type="submit">Cập nhật</a-button>
          </a-form-item>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col md:flex-row md:space-x-1 justify-between">
            <div class="flex md:flex-col mb-2 h-fit md:w-[15%]">
              <div class="md:w-full w-3/4 flex items-center">
                <label class="line-clamp-1" for="Necessity"
                  >Chi tiêu thiết yếu</label
                >
              </div>
              <div class="md:w-full w-1/4">
                <a-form-item
                  class="custom-ant-form-item"
                  name="necessity"
                  :rules="[
                    {
                      required: false,
                      message: 'Please input necessity percentage!',
                    },
                  ]"
                >
                  <a-input v-model:value="funds.necessity">
                    <template #suffix> % </template>
                  </a-input>
                </a-form-item>
              </div>
            </div>
            <div
              class="flex md:flex-col items-center justify-center mb-2 md:w-[15%]"
            >
              <div class="md:w-full w-3/4">
                <label class="line-clamp-1" for="input2">Tự do tài chính</label>
              </div>
              <div class="md:w-full w-1/4">
                <a-form-item
                  class="custom-ant-form-item"
                  name="freedom"
                  :rules="[
                    {
                      required: false,
                      message: 'Please input financial freedom percentage!',
                    },
                  ]"
                >
                  <a-input v-model:value="funds.freedom">
                    <template #suffix> % </template>
                  </a-input>
                </a-form-item>
              </div>
            </div>
            <div
              class="flex md:flex-col items-center justify-center mb-2 md:w-[15%]"
            >
              <div class="md:w-full w-3/4">
                <label class="line-clamp-1" for="input3"
                  >Giáo dục đào tạo</label
                >
              </div>
              <div class="md:w-full w-1/4">
                <a-form-item
                  class="custom-ant-form-item"
                  name="education"
                  :rules="[
                    {
                      required: false,
                      message: 'Please input education percentage!',
                    },
                  ]"
                >
                  <a-input v-model:value="funds.education">
                    <template #suffix> % </template>
                  </a-input>
                </a-form-item>
              </div>
            </div>
            <div
              class="flex md:flex-col items-center justify-center mb-2 md:w-[15%]"
            >
              <div class="md:w-full w-3/4">
                <label class="line-clamp-1" for="input4">Hưởng thụ</label>
              </div>
              <div class="md:w-full w-1/4">
                <a-form-item
                  class="custom-ant-form-item"
                  name="enjoy"
                  :rules="[
                    {
                      required: false,
                      message: 'Please input enjoy percentage!',
                    },
                  ]"
                >
                  <a-input v-model:value="funds.enjoy">
                    <template #suffix> % </template>
                  </a-input>
                </a-form-item>
              </div>
            </div>
            <div
              class="flex md:flex-col items-center justify-center mb-2 md:w-[15%]"
            >
              <div class="md:w-full w-3/4">
                <label class="line-clamp-1" for="input5">Cho đi</label>
              </div>
              <div class="md:w-full w-1/4">
                <a-form-item
                  class="custom-ant-form-item"
                  name="giving"
                  :rules="[
                    {
                      required: false,
                      message: 'Please input giving percentage!',
                    },
                  ]"
                >
                  <a-input v-model:value="funds.giving">
                    <template #suffix> % </template>
                  </a-input>
                </a-form-item>
              </div>
            </div>
            <div
              class="flex md:flex-col items-center justify-center mb-2 md:w-[15%]"
            >
              <div class="md:w-full w-3/4">
                <label class="line-clamp-1" for="input6"
                  >Tiết kiệm dài hạn</label
                >
              </div>
              <div class="md:w-full w-1/4">
                <a-form-item
                  class="custom-ant-form-item"
                  name="longTermSaving"
                  :rules="[
                    {
                      required: false,
                      message: 'Please input long term saving percentage!',
                    },
                  ]"
                >
                  <a-input v-model:value="funds.longTermSaving">
                    <template #suffix> % </template>
                  </a-input>
                </a-form-item>
              </div>
            </div>
          </div>
        </div>
      </a-form>
    </ConfigProvider>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Col, Form, Row, FormItem, Input, Button } from "ant-design-vue";
import { SettingOutlined } from "@ant-design/icons-vue";
import { getFundsPercentage, setFunds } from "@/composables/funds/index.js";
import { ConfigProvider } from "ant-design-vue";
import { setAllHandleIncomes } from "@/composables/handleIncomes";

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
    SettingOutlined,
    ConfigProvider,
  },
  setup() {
    const store = useStore();
    const currentFunds = computed(() => store.getters.getFunds);
    const initialfunds = computed(
      () =>
        getFundsPercentage(currentFunds.value) ?? {
          necessity: 0,
          freedom: 0,
          education: 0,
          enjoy: 0,
          giving: 0,
          longTermSaving: 0,
        },
    );

    const onFinish = async (values: any) => {
      let totalPercent: number = 0;
      const funds = ref(currentFunds.value);

      Object.keys(values).forEach((field) => {
        totalPercent = totalPercent + parseFloat(values[field]);
      });

      // Check total percent
      if (totalPercent != 100) {
        alert(
          `Total of funds percentage must be 100%! Please modify! Now is ${totalPercent}`,
        );
      } else {
        Object.keys(values).forEach((field) => {
          funds.value.find((item: FundItem) => item.id === field).percentage =
            parseFloat(values[field]);
        });
        store.dispatch("setFunds", funds.value);
        await setFunds(values);
        const handleIncomes = store.getters.getHandleIncomes;
        await setAllHandleIncomes(handleIncomes);
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    return { funds: initialfunds, onFinish, onFinishFailed };
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
.custom-ant-form-item.ant-form-item {
  margin-bottom: 0px !important;
}
</style>
