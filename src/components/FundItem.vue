<template>
  <div class="mx-2 text-center">
    <div v-if="data.src" class="flex justify-center items-center">
      <img :src="data.src" class="w-16 h-16 rounded-lg" />
    </div>
    <h3 class="font-bold my-2">{{ data.wallet }}</h3>
    <div
      class="font-bold h-12 flex justify-center items-center rounded-lg lg:mx-0"
      :class="data.id && 'bg-[#E6F4FF] dark:bg-[#1D1D1D]'"
    >
      {{ data.name }}
    </div>
    <!-- Thêm một phần tử flex-grow để căn chỉnh -->
    <p v-if="data.percentage" class="my-2 font-bold">{{ data.percentage }}%</p>
    <div class="flex-grow"></div>
  </div>
  <div class="text-center">
    <div
      v-if="data.percentage"
      class="my-2 font-bold md:bg-[#FAFAFA] md:dark:bg-[#1D1D1D] leading-[2.5rem] left-0 w-full"
    >
      <p v-if="isVisible">
        {{ calculateLimitation(totalIncome, data.percentage).text }}
      </p>
      <p v-else>******</p>
    </div>
    <div v-else class="absolute bottom-0 left-0 w-full">
      <div class="md:hidden">
        <div class="flex justify-center items-center">
          <p
            class="w-16 h-16 rounded-lg border-2 border-[#000000] flex justify-center items-center"
          >
            Logo
          </p>
        </div>
        <h3 class="font-bold my-2">Tên ví</h3>
        <div
          class="font-bold h-12 flex justify-center items-center rounded-lg lg:mx-0 bg-[#E6F4FF] dark:bg-[#1D1D1D] my-2"
        >
          Tên quỹ
        </div>
      </div>
      <div class="flex sm:flex-col items-center justify-center my-2">
        <div class="px-2 sm:py-4 cursor-pointer" @click="toggleVisibility">
          <img v-if="isVisible" :src="showEye" class="w-6 h-6" />
          <img v-else :src="hideEye" class="w-6 h-6" />
        </div>
        <a-switch
          class="my-ant-switch"
          v-model:checked="checked"
          @change="updateIsFundsEditable"
        />
      </div>
      <p
        class="my-2 font-bold bg-[#FAFAFA] dark:bg-[#1D1D1D] rounded-l-full leading-[2.5rem] dark:border-[#303030] mx-4 md:mx-0"
      >
        Limitation
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Switch } from "ant-design-vue";
import { calculateLimitation } from "@/composables/funds/index";
import showEye from "@/assets/icons/showEye.png";
import hideEye from "@/assets/icons/hideEye.png";

export default {
  components: {
    ASwitch: Switch,
  },
  emits: ["action:updateIsVisibleLimitation"],
  props: {
    totalIncome: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object,
      default: () => {},
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const isFundsEditable = computed(() => store.getters.getIsFundsEditable);
    const checked = ref(false);

    function toggleVisibility() {
      console.log("click toggleVisibility");

      emit("action:updateIsVisibleLimitation");
    }

    function updateIsFundsEditable() {
      store.dispatch("setIsFundsEditable", !isFundsEditable.value);
    }

    return {
      checked,
      hideEye,
      showEye,
      calculateLimitation,
      updateIsFundsEditable,
      toggleVisibility,
    };
  },
};
</script>

<style>
.my-ant-switch.ant-switch {
  background-color: grey;
}
.my-ant-switch.ant-switch-checked {
  background-color: #1677ff;
}
</style>
