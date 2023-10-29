<template>
  <div class="mx-2 text-center">
    <div v-if="data.src" class="flex justify-center items-center">
      <img :src="data.src" class="w-16 h-16 rounded-lg" />
    </div>
    <h3 class="font-bold my-2">{{ data.wallet }}</h3>
    <div
      class="font-bold h-12 flex justify-center items-center rounded-lg mx-10 lg:mx-0"
      :class="data.id && 'bg-[#E6F4FF]'"
    >
      {{ data.name }}
    </div>
    <!-- Thêm một phần tử flex-grow để căn chỉnh -->
    <p v-if="data.percentage" class="my-2 font-bold">{{ data.percentage }}%</p>
    <div class="flex-grow"></div>
  </div>
  <div class="text-center">
    <p
      v-if="data.percentage"
      class="my-2 font-bold md:bg-[#FAFAFA] leading-[2.5rem] left-0 w-full"
    >
      {{
        new Intl.NumberFormat().format((totalIncome * data.percentage) / 100)
      }}
    </p>
    <p
      v-else
      class="my-2 font-bold bg-[#FAFAFA] rounded-l-full leading-[2.5rem] absolute bottom-0 left-0 w-full border-r-2 border-[#ffffff]"
    >
      Limitation
    </p>
  </div>
</template>
<script>
export default {
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
};
</script>
