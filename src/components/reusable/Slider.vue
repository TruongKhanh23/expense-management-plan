<template>
  <Splide
    :options="{
      rewind: true,
      perPage: 4,
      gap: '2.5rem',
      breakpoints: {
        768: {
          perPage: 1,
          arrows: false,
        },
      },
      ...attrs,
    }"
  >
    <SplideSlide v-for="(item, index) in list" :key="index">
      <slot name="content" :data="item" :index="index" />
    </SplideSlide>
  </Splide>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";

export default {
  components: {
    Splide,
    SplideSlide,
  },
  props: {
    list: {
      type: Array,
      default: () => [1, 2],
    },
    attrs: {
      type: Object,
    },
  },
};
</script>
