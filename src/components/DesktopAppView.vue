<template>
  <a-col :md="{ span: 6 }">
    <EstimateNecessity :data="dataEstimateNecessity" />
  </a-col>

  <a-col :md="{ span: 8 }">
    <IncomeDebt :totalIncome="totalIncome" />
  </a-col>

  <a-col :md="{ span: 10 }">
    <HandleIncome :totalIncome="totalIncome" />
  </a-col>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Col, Button } from "ant-design-vue";
import IncomeDebt from "@/components/IncomeDebt.vue";
import HandleIncome from "@/components/handleIncome/HandleIncome.vue";
import EstimateNecessity from "@/components/estimateNecessity/EstimateNecessity.vue";

export default {
  components: {
    ACol: Col,
    AButton: Button,
    IncomeDebt,
    HandleIncome,
    EstimateNecessity,
  },
  setup() {
    const store = useStore();
    const isDark = computed(() => store.getters.getIsDark);
    const totalIncome = computed(() => store.getters.getTotalIncome);
    const dataEstimateNecessity = computed(
      () => store.getters.getEstimateNecessities,
    );
    return { totalIncome, dataEstimateNecessity, isDark };
  },
};
</script>
