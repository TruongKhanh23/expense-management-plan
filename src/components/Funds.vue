<template>
  <Slider
    :list="funds"
    :attrs="{
      perPage: 7,
      arrows: false,
      gap: 0,
      breakpoints: {
        768: {
          perPage: 1,
          arrows: false,
          start: 1,
          pagination: false,
        },
      },
    }"
  >
    <template #content="{ data }">
      <div class="mx-2 text-center">
        <div v-if="data.src" class="flex justify-center items-center">
          <img :src="data.src" class="w-16 h-16" />
        </div>
        <h3 class="font-bold my-2">{{ data.wallet }}</h3>
        <div
          class="font-bold h-12 flex justify-center items-center rounded-lg text-white mx-10 lg:mx-0"
          :class="data.classColor"
        >
          {{ data.name }}
        </div>
        <!-- Thêm một phần tử flex-grow để căn chỉnh -->
        <p v-if="data.percentage" class="my-2 font-bold">
          {{ data.percentage }}%
        </p>
        <div class="flex-grow"></div>
      </div>
      <div class="text-center">
        <p
          v-if="data.percentage"
          class="my-2 font-bold md:bg-[#ffdddd] leading-[2.5rem] left-0 w-full"
        >
          {{
            new Intl.NumberFormat().format(
              (totalIncome * data.percentage) / 100,
            )
          }}
        </p>
        <p
          v-else
          class="my-2 font-bold bg-[#ffdddd] rounded-l-full leading-[2.5rem] absolute bottom-0 left-0 w-full border-r-2 border-[#ffffff]"
        >
          Hạn mức
        </p>
      </div>
    </template>
  </Slider>
</template>
<script>
import Slider from "../components/reusable/Slider.vue";
import "@splidejs/vue-splide/css";

export default {
  components: {
    Slider,
  },
  props: {
    funds: {
      type: Object,
      require: true,
    },
    totalIncome: {
      type: Number,
      require: true,
    },
  },
};
</script>
