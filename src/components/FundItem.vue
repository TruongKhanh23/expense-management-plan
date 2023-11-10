<template>
  <div class="mx-2 text-center">
    <div v-if="data.src" class="flex justify-center items-center">
      <img :src="data.src" class="w-16 h-16 rounded-lg" />
    </div>
    <h3 class="font-bold my-2">{{ data.wallet }}</h3>
    <div
      class="font-bold h-12 flex justify-center items-center rounded-lg lg:mx-0"
      :class="data.id && 'bg-[#E6F4FF]'"
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
      class="my-2 font-bold md:bg-[#FAFAFA] leading-[2.5rem] left-0 w-full"
    >
      {{
        new Intl.NumberFormat().format((totalIncome * data.percentage) / 100)
      }}
    </div>
    <div v-else class="absolute bottom-0 left-0 w-full">
      <div class="md:hidden">
        <div class="flex justify-center items-center">
          <p class="w-16 h-16 rounded-lg border-2 border-[#000000] flex justify-center items-center">
            Logo
          </p>
        </div>
        <h3 class="font-bold my-2">Tên ví</h3>
        <div
          class="font-bold h-12 flex justify-center items-center rounded-lg lg:mx-0 bg-[#E6F4FF] my-2"
        >
          Tên quỹ
        </div>
      </div>
      <div>
        <a-switch
          class="my-ant-switch"
          v-model:checked="checked"
          @change="updateIsFundsEditable"
        />
      </div>
      <p
        class="my-2 font-bold bg-[#FAFAFA] rounded-l-full leading-[2.5rem] border-r-2 border-[#ffffff] mx-4 md:mx-0"
      >
        Limitation
      </p>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { Switch } from "ant-design-vue";

export default {
  components: {
    ASwitch: Switch,
  },
  emits: ["action:updateIsFundsEditable"],
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
  setup(_, { emit }) {
    const checked = ref(false);
    function updateIsFundsEditable() {
      emit("action:updateIsFundsEditable");
    }
    return { checked, updateIsFundsEditable };
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
