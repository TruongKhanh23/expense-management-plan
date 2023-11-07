<template>
  <div class="min-h-[240px]">
    <Slider :list="funds" :attrs="sliderAttrs">
      <template #content="{ data }">
        <FundItem
          @action:updateIsFundsEditable="updateIsFundsEditable"
          :data="data"
          :totalIncome="totalIncome"
        />
      </template>
    </Slider>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import FundItem from "@/components/FundItem.vue";
import Slider from "../components/reusable/Slider.vue";
import "@splidejs/vue-splide/css";

export default {
  components: {
    Slider,
    FundItem,
  },
  emits: ["action:updateIsFundsEditable"],
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
  setup(props) {
    const isMobile = ref(false);

    const sliderAttrs = computed(() => {
      if (isMobile.value) {
        return {
          perPage: 1,
          arrows: false,
          gap: 0,
          pagination: false,
        };
      } else {
        return {
          perPage: 7,
          arrows: false,
          gap: 0,
        };
      }
    });

    const checkIsMobile = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    onMounted(() => {
      checkIsMobile();
      // When page is rendered, screen size may be changed, use resize listner để call check mobile
      window.addEventListener("resize", checkIsMobile);
    });

    // When component is destroyed, remove listener resize to save resource
    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkIsMobile);
    });

    return { sliderAttrs };
  },
};
</script>
