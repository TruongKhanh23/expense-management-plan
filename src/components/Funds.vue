<template>
  <div class="min-h-[240px]">
    <Slider :list="funds" :attrs="sliderAttrs">
      <template #content="{ data }">
        <FundItem
          @action:updateIsFundsEditable="$emit('action:updateIsFundsEditable')"
          :data="data"
          :totalIncome="totalIncome"
          :isVisible="isVisible"
          @action:updateIsVisibleLimitation="handleUpdateIsVisibleLimitation"
        />
      </template>
    </Slider>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import FundItem from "@/components/FundItem.vue";
import Slider from "../components/reusable/Slider.vue";
import detectDevice from "@/utils/device.util";
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
  },
  setup(props) {
    const store = useStore();
    const isVisible = ref(false);
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

    function handleUpdateIsVisibleLimitation() {
      isVisible.value = !isVisible.value;
      console.log("isVisible.value", isVisible.value);
    }

    return {
      sliderAttrs,
      isVisible,
      handleUpdateIsVisibleLimitation,
      totalIncome,
    };
  },
};
</script>
