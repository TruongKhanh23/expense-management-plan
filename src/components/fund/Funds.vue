<template>
  <div class="min-h-[240px]">
    <Slider :list="funds" :attrs="sliderAttrs">
      <template #content="{ data }">
        <FundItem :data="data" :totalIncome="totalIncome" />
      </template>
    </Slider>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import FundItem from "@/components/fund/FundItem.vue";
import Slider from "../components/reusable/Slider.vue";
import detectDevice from "@/utils/device.util";
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
  },
  setup(props) {
    const store = useStore();
    const { isMobile, isTabletVertical, isTabletHorizontal, isDesktop } =
      detectDevice();

    const totalIncome = computed(() => store.getters.getTotalIncome);
    const sliderAttrs = computed(() => {
      if (isMobile) {
        return {
          perPage: 1,
          arrows: false,
          gap: 8,
          pagination: false,
        };
      }
      if (isTabletVertical) {
        return {
          perPage: 4,
          arrows: false,
          gap: 0,
          pagination: false,
        };
      }
      if (isTabletVertical || isDesktop) {
        return {
          perPage: 7,
          arrows: false,
          gap: 0,
        };
      }
    });

    return {
      sliderAttrs,
      totalIncome,
    };
  },
};
</script>
