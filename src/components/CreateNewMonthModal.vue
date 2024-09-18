<template>
  <LoadingModal :isOpen="isOpenLoadingModal" />
  <div
    v-if="isOpen"
    id="popup-modal"
    tabindex="-1"
    class="fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-opacity-50 bg-[#000000]"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-[#181A1B]">
        <div class="p-4 text-center flex justify-center flex-col">
          <h3 class="mb-5 text-lg font-bold">Create New Month</h3>
          <a-form
            :model="formState"
            name="time_related_controls"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <div class="flex justify-center items-center gap-4">
              <label>Choose Month:</label>
              <a-form-item
                class="custom-ant-form-item"
                name="month"
                v-bind="config"
              >
                <a-date-picker
                  v-model:value="formState['month']"
                  value-format="MM-YYYY"
                  :format="monthFormat"
                  picker="month"
                />
              </a-form-item>
            </div>

            <a-form-item>
              <div class="flex flex-row gap-2 justify-center mt-4">
                <a-button html-type="submit">Create</a-button>
                <a-button danger @click="handleClose">Cancel</a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed } from "vue";
import { Button, DatePicker, Form, FormItem, Modal } from "ant-design-vue";
import { reactive } from "vue";
import { createNewMonthByDuplicate } from "@/composables/collection/index.js";
import CIcon from "@/components/reusable/CIcon.vue";
import LoadingModal from "@/components/reusable/LoadingModal.vue";
import { open, close } from "@/composables/loadingModal/index.js";
import { Dayjs } from "dayjs";
import { setCurrentChooseMonth } from "@/utils/time.util";

interface FormState {
  month: Dayjs;
}

export default {
  components: {
    AModal: Modal,
    CIcon,
    AForm: Form,
    AFormItem: FormItem,
    ADatePicker: DatePicker,
    AButton: Button,
    LoadingModal,
  },
  emits: [
    "action:updateIsOpenCreateNewMonthModal",
    "action:updateNewMonthCreated",
  ],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isOpen = computed(() => <boolean>props.isOpen);
    const isOpenLoadingModal = ref(false);
    const monthFormat = "MM-YYYY";
    const handleClose = () => {
      emit("action:updateIsOpenCreateNewMonthModal");
    };

    const config = {
      rules: [
        {
          type: "string" as const,
          required: true,
          message: "Please select time!",
        },
      ],
    };
    const formState = reactive({} as FormState);
    const onFinish = async (values: any) => {
      const monthYear = values.month;
      const year = monthYear.substring(monthYear.length - 4);
      const month = monthYear.slice(0, 2);
      emit("action:updateIsOpenCreateNewMonthModal");

      isOpenLoadingModal.value = open();
      await createNewMonthByDuplicate(month, year, monthYear);

      setCurrentChooseMonth(year, monthYear);
      emit("action:updateNewMonthCreated", monthYear);

      isOpenLoadingModal.value = close();
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };

    return {
      isOpen,
      handleClose,
      formState,
      config,
      onFinish,
      onFinishFailed,
      monthFormat,
      isOpenLoadingModal,
    };
  },
};
</script>
<style>
.custom-ant-form-item.ant-form-item {
  margin-bottom: 0px !important;
}
</style>
