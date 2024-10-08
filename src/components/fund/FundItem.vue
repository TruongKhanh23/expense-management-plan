<template>
  <div class="mx-2 text-center">
    <div v-if="data.src" class="flex justify-center items-center">
      <img :src="data.src" class="w-16 h-16 rounded-lg" />
    </div>
    <h3 class="font-bold my-2">{{ data.wallet }}</h3>
    <div
      class="font-bold h-12 flex justify-center items-center rounded-lg lg:mx-0"
      :class="data.id && 'bg-[#E6F4FF] md:dark:bg-[#1D1D1D] dark:bg-[#141414]'"
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
      <p v-if="isVisibleLimitation">
        {{ calculateLimitation(totalIncome, data.percentage).text }}
      </p>
      <p v-else>******</p>
    </div>
    <div v-else class="absolute bottom-0 left-0 w-full">
      <div class="md:hidden">
        <div class="flex justify-center items-center">
          <p class="w-16 h-16 flex justify-center items-center">
            <img
              src="/favicons/android-chrome-512x512.png"
              alt="logo"
              class="rounded-lg"
            />
          </p>
        </div>
        <h3 class="font-bold my-2">Tên ví</h3>
        <div
          class="font-bold h-12 flex justify-center items-center rounded-lg lg:mx-0 bg-[#E6F4FF] md:dark:bg-[#1D1D1D] dark:bg-[#141414] my-2"
        >
          Tên quỹ
        </div>
      </div>
      <div class="flex sm:flex-col items-center justify-center my-2">
        <div class="px-2 sm:py-4 cursor-pointer" @click="toggleVisibility">
          <img v-if="isVisibleLimitation" :src="showEye" class="w-6 h-6" />
          <img v-else :src="hideEye" class="w-6 h-6" />
        </div>
        <a-switch
          class="my-ant-switch"
          v-model:checked="checked"
          @change="updateIsFundsEditable"
        />
      </div>
      <p
        class="my-2 font-bold bg-[#FAFAFA] md:dark:bg-[#1D1D1D] dark:bg-[#181A1B] rounded-l-full leading-[2.5rem] mx-4 md:mx-0"
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
  props: {
    totalIncome: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const isVisibleLimitation = computed(
      () => store.getters.getIsVisibleLimitation,
    );
    const isFundsEditable = computed(() => store.getters.getIsFundsEditable);
    const checked = ref(false);

    function toggleVisibility() {
      store.dispatch("setIsVisibleLimitation", !isVisibleLimitation.value);
    }

    function updateIsFundsEditable() {
      store.dispatch("setIsFundsEditable", !isFundsEditable.value);
    }

    return {
      checked,
      hideEye,
      showEye,
      isVisibleLimitation,
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
