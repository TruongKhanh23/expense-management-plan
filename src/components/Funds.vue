<template>
  <Slider
    class="hidden md:inline"
    :list="funds"
    :attrs="{
      perPage: 7,
      arrows: false,
      gap: 0,
    }"
  >
    <template #content="{ data }">
      <FundItem :data="data" :totalIncome="totalIncome"
    /></template>
  </Slider>
  <Slider
    class="md:hidden"
    :list="funds.slice(1)"
    :attrs="{
      perPage: 1,
      arrows: false,
      gap: 0,
      pagination: false,
      start: 1,
    }"
  >
    <template #content="{ data }">
      <FundItem :data="data" :totalIncome="totalIncome" />
      <p>{{ md }}</p></template
    >
  </Slider>
</template>
<script>
import FundItem from "@/components/FundItem.vue";
import Slider from "../components/reusable/Slider.vue";
import "@splidejs/vue-splide/css";

export default {
  components: {
    Slider,
    FundItem,
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
